<template>
  <Teleport to="body">
    <!-- 登录加载状态 -->
    <div v-if="isLoggingIn" class="login-loading-modal">
      <div class="loading-content">
        <div class="spinner"></div>
        <p>正在登录中，请稍候...</p>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="modal-overlay" :class="{ 'active': showModal }" @click.self="closeModal"></div>

    <!-- 主模态框 -->
    <div class="connect-modal" :class="{ 'active': showModal }">
      <div class="modal-header">
        <h3>{{ w_connected ? '账户管理' : '连接钱包' }}</h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>

      <!-- 已连接钱包视图 -->
      <div v-if="connected" class="connected-view">
        <div class="wallet-info">
          <img v-if="currentWalletIcon" :src="currentWalletIcon" class="wallet-icon large">
          <div class="wallet-details">
            <p class="wallet-name">{{ currentWalletName }}</p>
            <p class="wallet-address">{{ walletAddress }}</p>
          </div>
        </div>

        <!-- 社交账号绑定 -->
        <div class="social-bindings">
          <h4>绑定社交账号</h4>
          <div class="social-buttons">
            <button
                class="social-btn tg-btn"
                @click="initiateTelegramLogin"
                :disabled="isTelegramBound"
            >
              <i class="icon-tg"></i>
              {{ isTelegramBound ? `已绑定 Telegram (${telegramUsername})` : '绑定 Telegram' }}
            </button>

            <!-- Telegram 登录弹窗 -->
            <div v-if="showTelegramModal" class="telegram-modal-overlay" @click.self="closeTelegramModal">
              <div class="telegram-modal">
                <div class="modal-header">
                  <h3>通过 Telegram 登录</h3>
                  <button class="close-btn" @click="closeTelegramModal">&times;</button>
                </div>
                <div class="telegram-login-content">
                  <p>请点击下方按钮通过 Telegram 登录</p>
                  <bind-tg-card
                      mode="callback"
                      telegram-login="mystonksdaotg_bot"
                      @callback="handleTelegramCallback"
                      class="telegram-login-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="disconnect-btn" @click="disconnectWallet">
          断开钱包连接
        </button>
      </div>

      <!-- 未连接钱包视图 -->
      <div v-else class="wallet-options">
        <button
            v-for="wallet in walletProviders"
            :key="wallet.name"
            class="wallet-option"
            @click="selectWallet(wallet)"
            :disabled="!wallet.adapter.readyState"
        >
          <img :src="wallet.icon" class="wallet-icon">
          <span>
            {{ wallet.name }}
            <span v-if="!wallet.adapter.readyState" class="uninstalled-tip">(需安装)</span>
          </span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useWallet } from 'solana-wallets-vue';
import { bindTg, getRandom, walletLogin } from "@/services/user.js";
import BindTgCard from '@/components/BindTGCard.vue';

const router = useRouter();
const { connected, publicKey, connect, disconnect, select, wallet, wallets } = useWallet();

const props = defineProps({
  showModal: Boolean,
  walletAddress: String
});

const emit = defineEmits(['update:showModal', 'disconnect']);

// 状态管理
const showTelegramModal = ref(false);
const isLoggingIn = ref(false);
const isTelegramBound = ref(false);
const telegramUsername = ref('');

// 计算属性
const walletProviders = computed(() => {
  return wallets.value.map(wallet => ({
    name: wallet.adapter.name,
    icon: wallet.adapter.icon,
    adapter: wallet.adapter
  }));
});

const currentWalletName = computed(() => {
  return wallets.value.find(w => w.adapter.connected)?.adapter.name || '';
});

const currentWalletIcon = computed(() => {
  return wallets.value.find(w => w.adapter.connected)?.adapter.icon || '';
});

// 生命周期钩子
onMounted(() => {
  checkLoginStatus();
});

// 方法定义
const checkLoginStatus = () => {
  if (!connected) {
    clearLocalStorage()
    return;
  }

  const tgId = localStorage.getItem("tg_id");
  const tgName = localStorage.getItem("tg_name");

  if (tgId && tgId !== "0") {
    isTelegramBound.value = true;
    telegramUsername.value = tgName || "Telegram用户";
  } else {
    isTelegramBound.value = false;
    telegramUsername.value = "";
  }
};

const closeModal = () => {
  emit('update:showModal', false);
};

const initiateTelegramLogin = () => {
  showTelegramModal.value = true;
};

const closeTelegramModal = () => {
  showTelegramModal.value = false;
};

const handleTelegramCallback = async (user) => {
  if (!user) return;

  try {
    const sol_addr = localStorage.getItem("solAddr");
    const res = await bindTg({
      addr: sol_addr,
      telegram_id: user.id,
      username: user.username,
      photo_url: user.photo_url,
      auth_date: user.auth_date,
      hash: user.hash,
      first_name: user.first_name,
    });

    if (res) {
      isTelegramBound.value = true;
      telegramUsername.value = user.username || user.first_name;
      localStorage.setItem("tg_name", user.first_name);
      localStorage.setItem("tg_id", user.id);
      localStorage.setItem("tg_photo", user.photo_url);
    }
  } catch (error) {
    console.error('绑定Telegram失败:', error);
  } finally {
    closeTelegramModal();
  }
};

const selectWallet = async (wallet) => {
  try {
    if (!wallet.adapter.connected && !wallet.adapter.connecting) {
      select(wallet.adapter.name);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await connect();
    closeModal();
  } catch (error) {
    handleWalletError(error);
  }
};

const handleWalletError = (error) => {
  let message = '连接失败';

  if (error.message.includes('WalletNotSelected')) {
    message = '⚠️ 请先选择钱包';
  } else if (error.message.includes('WalletNotFound')) {
    message = '🔌 请先安装钱包插件';
  } else if (error.message.includes('User rejected')) {
    message = '❌ 您拒绝了连接请求';
  } else {
    message += `: ${error.message}`;
  }

  alert(message);
};

const disconnectWallet = async () => {
  try {
    await disconnect();
    clearLocalStorage();
    emit('disconnect');
    isTelegramBound.value = false;
    closeModal();
    await router.push('/');
  } catch (error) {
    console.error('断开连接失败:', error);
  }
};

const clearLocalStorage = () => {
  ['solAddr', 'access_token', 'refresh_token', 'tg_id', 'tg_name', 'tg_photo'].forEach(key => {
    localStorage.removeItem(key);
  });
};

const login = async () => {
  try {
    const res = await getRandom();
    const solAddr = publicKey.value.toBase58();
    const message = new TextEncoder().encode(res.nonce);
    const signature = await wallet._rawValue.adapter.signMessage(message, 'utf8');
    const signatureBase64 = Buffer.from(signature).toString('base64');

    const loginRes = await walletLogin({
      address: solAddr,
      signature: signatureBase64,
      nonce: res.nonce,
    });

    if (loginRes) {
      localStorage.setItem("solAddr", solAddr);
      localStorage.setItem("access_token", loginRes.data.access_token);
      localStorage.setItem("refresh_token", loginRes.data.refresh_token);

      if (loginRes.tg_info) {
        localStorage.setItem("tg_name", loginRes.tg_info.first_name);
        localStorage.setItem("tg_id", loginRes.tg_info.telegram_id);
        localStorage.setItem("tg_photo", loginRes.tg_info.photo_url);
      }

      router.push('/');
    }
  } catch (error) {
    console.error('登录失败:', error);
  }
};

const handleWalletLogin = async () => {
  if (localStorage.getItem("solAddr")) return;

  isLoggingIn.value = true;
  try {
    await login();
    alert("登录成功");
  } catch (error) {
    console.error('钱包登录失败:', error);
  } finally {
    isLoggingIn.value = false;
  }
};

// 监听钱包连接状态变化
watch(connected, async (newVal) => {
  if (newVal && publicKey.value && !localStorage.getItem("solAddr")) {
    await handleWalletLogin();
  }
});
</script>

<style scoped>
/* 基础样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.connect-modal {
  position: fixed;
  top: 0;
  right: -100%;
  width: 400px;
  height: 100vh;
  background: #1e1e2e;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.connect-modal.active {
  right: 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h3 {
  font-size: 1.5rem;
  color: white;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

/* 钱包选项样式 */
.wallet-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wallet-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.wallet-option:hover {
  background: rgba(138, 43, 226, 0.2);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.wallet-option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wallet-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.uninstalled-tip {
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 5px;
}

/* 已连接钱包样式 */
.connected-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  padding: 1.5rem;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.wallet-icon.large {
  width: 48px;
  height: 48px;
}

.wallet-details {
  flex: 1;
  overflow: hidden;
}

.wallet-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: white;
}

.wallet-address {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  word-break: break-all;
}

.disconnect-btn {
  width: 100%;
  padding: 1rem;
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.disconnect-btn:hover {
  background: rgba(231, 76, 60, 0.2);
}

/* 社交账号绑定样式 */
.social-bindings {
  width: 100%;
  margin: 1rem 0;
}

.social-bindings h4 {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.social-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.tg-btn {
  background: rgba(0, 136, 204, 0.2);
  color: #0088cc;
  border: 1px solid rgba(0, 136, 204, 0.4);
}

.tg-btn:not(:disabled):hover {
  background: rgba(0, 136, 204, 0.3);
}

.icon-tg {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230088cc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.25 1.58-1.32 5.41-1.87 7.19-.14.44-.41.58-.68.58-.33 0-.52-.25-.81-.85-.45-1.58-.77-2.66-1.24-3.98-.53-1.47-1.12-2.11-1.81-2.16-.56-.04-.97.1-1.35.38-.38.28-.47.45-.77.45-.18 0-.45-.11-.69-.2-.36-.15-.69-.25-1.13-.25-.6 0-1.15.28-1.15.83 0 .44.5 1.03 1.09 1.67.93.97 1.25 1.55 2.11 2.53.68.78 1.47 1.45 2.27 1.45.56 0 .9-.14 1.28-.5.39-.37.27-.42.39-.73.12-.31.64-1.14.9-1.56.28-.45.56-.5.9-.5.22 0 .58.04.85.66l1.17 2.75c.16.38.31.54.56.54.14 0 .28-.07.39-.2.12-.14.16-.31.16-.5 0-.31-.09-.62-.18-.93-.25-.93-.62-1.86-.93-2.79-.25-.75-.5-1.5-.75-2.25-.08-.25-.17-.5-.25-.75-.08-.25-.17-.37-.33-.37-.08 0-.17.04-.25.12-.08.08-.12.17-.17.25z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* Telegram 登录弹窗 */
.telegram-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
}

.telegram-modal {
  background: #1e1e2e;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
}

.telegram-login-content {
  text-align: center;
  padding: 1rem 0;
}

.telegram-login-content p {
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 登录加载状态 */
.login-loading-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  background-color: #1e1e2e;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 300px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #0088cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-content p {
  color: white;
  margin-top: 1rem;
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .connect-modal {
    width: 100%;
    padding: 1.5rem;
    border-left: none;
  }

  .wallet-options {
    gap: 0.8rem;
  }

  .wallet-option {
    padding: 1rem;
  }

  .wallet-info {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .wallet-icon.large {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .connect-modal {
    padding: 1rem;
  }

  .modal-header h3 {
    font-size: 1.2rem;
  }
}
</style>
