<template>
  <Teleport to="body">
    <div
        class="modal-overlay"
        :class="{ 'active': showModal }"
        @click.self="closeModal"
    ></div>
    <div class="connect-modal" :class="{ 'active': showModal }">
      <div class="modal-header">
        <h3>{{ connected ? '账户管理' : '连接钱包' }}</h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>

      <div v-if="connected"
           class="connected-view">
        <div class="wallet-info">
          <img
              v-if="currentWalletIcon"
              :src="currentWalletIcon"
              class="wallet-icon large"
          >
          <div class="wallet-details">
            <p class="wallet-name">{{ currentWalletName }}</p>
            <p class="wallet-address">{{ truncatedAddress }}</p>
          </div>
        </div>

        <div class="social-bindings">
          <h4>绑定社交账号</h4>
          <div class="social-buttons">

            <button
                class="social-btn tg-btn"
                @click="bindTelegram"
                :disabled="isTelegramBound"
                id="telegram-login-button"
            >
              <i class="icon-tg"></i>
              {{ isTelegramBound ? `已绑定 Telegram (${telegramUsername})` : '绑定 Telegram' }}
            </button>
<!--            <div  id="telegram-login-button"></div>-->


            <button
                class="social-btn twitter-btn"
                @click="bindTwitter"
                :disabled="isTwitterBound"
            >
              <i class="icon-twitter"></i>
              {{ isTwitterBound ? '已绑定 Twitter' : '绑定 Twitter' }}
            </button>
          </div>
        </div>

        <button class="disconnect-btn" @click="disconnectWallet">
          断开钱包连接
        </button>
      </div>

      <div v-else class="wallet-options">
        <button
            v-for="wallet in walletProviders"
            :key="wallet.name"
            class="wallet-option"
            @click="selectWallet(wallet)"
        >
          <img
              v-if="wallet.icon"
              :src="wallet.icon"
              :alt="wallet.name"
              class="wallet-icon"
          >
          <span>{{ wallet.name }}</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useWallet } from 'solana-wallets-vue';

const { connected, publicKey, connect, disconnect, select, wallets } = useWallet();

const props = defineProps({
  showModal: Boolean,
  walletAddress: String
});

const emit = defineEmits(['update:showModal', 'disconnect']);

const truncatedAddress = computed(() => {
  if (publicKey.value) {
    const address = publicKey.value.toString();
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  }
  return '';
});


// 社交账号绑定状态
const isTelegramBound = ref(false);
const isTwitterBound = ref(false);

const walletProviders = computed(() => {
  return wallets.value.map(wallet => ({
    name: wallet.adapter.name,
    icon: wallet.adapter.icon,
    adapter: wallet.adapter
  }));
});

// 检查 URL 中的 Telegram 授权回调参数
const checkTelegramAuth = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tgAuth = urlParams.get('tgAuth');

  if (tgAuth) {
    try {
      const authData = JSON.parse(decodeURIComponent(tgAuth));
      if (authData.id) {
        // 成功获取 Telegram 用户数据
        handleTelegramAuthSuccess(authData);

        // 清除 URL 中的参数
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch (e) {
      console.error('Telegram 授权数据解析失败:', e);
    }
  }
};



// 初始化 Telegram 登录
const initiateTelegramLogin = () => {
  if (isTelegramBound.value) return;

  // 创建 Telegram 登录小部件
  const botUsername = 'YourBotUsername'; // 替换为你的 Telegram Bot 用户名
  const redirectUrl = encodeURIComponent(window.location.origin + window.location.pathname);

  // 设置 Telegram 登录小部件参数
  const widgetParams = {
    bot_id: botUsername,
    origin: window.location.origin,
    request_access: true,
    lang: 'zh',
    userpic: false
  };
  console.log(1111
  )
  // 创建 iframe 或弹出窗口
  const widgetUrl = `https://oauth.telegram.org/auth?bot_id=${botUsername}&origin=${encodeURIComponent(window.location.origin)}&embed=1&request_access=true&return_to=${redirectUrl}`;

  // 方法1: 使用 iframe (推荐)
  const iframe = document.createElement('iframe');
  iframe.src = widgetUrl;
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.zIndex = '9999';
  iframe.style.border = 'none';
  iframe.style.backgroundColor = 'rgba(0,0,0,0.5)';
  document.body.appendChild(iframe);

  // 监听消息事件
  window.addEventListener('message', (e) => {
    if (e.origin === 'https://oauth.telegram.org') {
      if (e.data.event === 'auth_result') {
        if (e.data.result === 'success') {
          handleTelegramAuthSuccess(e.data.auth);
        }
        document.body.removeChild(iframe);
      }
    }
  });
};


// Telegram 登录回调函数（必须挂载到 window）
function onTelegramAuth(user) {

  console.log('✅ Telegram 登录成功，用户信息:', user)
  // 你可以把 user.id / user.username 等发给后端
}


const bindTelegram = () => {
  console.log('绑定账号被点击',11111);
  // 将回调函数挂载到 window
  window.onTelegramAuth = onTelegramAuth
  const script = document.createElement('script')
  script.src = 'https://telegram.org/js/telegram-widget.js?7'
  script.async = true
  script.setAttribute('data-telegram-login', 'myStonks_mawen_bot') // ⚠️ 替换成你的 Bot 用户名（不带 @）
  script.setAttribute('data-size', 'large')
  script.setAttribute('data-userpic', 'false')
  script.setAttribute('data-radius', '8')
  script.setAttribute('data-lang', 'zh')
  script.setAttribute('data-onauth', 'onTelegramAuth(user)')
  script.setAttribute('data-request-access', 'write')

  const container = document.getElementById('telegram-login-button')
  if (container) {
    debugger
    container.innerHTML = '' // 清空旧的（防止重复插入）
    container.appendChild(script)
  }

}




const currentWalletName = computed(() => {
  return wallets.value.find(w => w.adapter.connected)?.adapter.name || '';
});

const currentWalletIcon = computed(() => {
  return wallets.value.find(w => w.adapter.connected)?.adapter.icon || '';
});

const closeModal = () => {
  emit('update:showModal', false);
};

const selectWallet = async (wallet) => {
  try {
    select(wallet.adapter.name);
    await connect();
    closeModal();
  } catch (error) {
    console.error('钱包连接错误:', error);
  }
};

const disconnectWallet = async () => {
  try {
    await disconnect();
    emit('disconnect');
    closeModal();
  } catch (error) {
    console.error('断开连接失败:', error);
  }
};

// 绑定Twitter
const bindTwitter = () => {
  // 这里应该实现实际的Twitter绑定逻辑
  // 例如打开Twitter OAuth授权页面
  window.open('https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI', '_blank');
  // 模拟绑定成功
  isTwitterBound.value = true;
};

// 组件挂载时检查 Telegram 授权
onMounted(() => {
  checkTelegramAuth();

  // 检查本地存储中是否有已绑定的 Telegram 账号
  const savedTgData = localStorage.getItem('telegramAuth');
  if (savedTgData) {
    try {
      const authData = JSON.parse(savedTgData);
      handleTelegramAuthSuccess(authData);
    } catch (e) {
      console.error('解析存储的 Telegram 数据失败:', e);
    }
  }
});

</script>
<style scoped>
/* 遮罩层 */
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
  width: 100vw;
  height: 100vh;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: all;
}

/* Connect Modal */
.connect-modal {
  position: fixed;
  top: 0;
  right: -100%;
  width: 40rem;
  max-width: 500px;
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

.wallet-options {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 0.8rem;
  overflow: auto;
}

.wallet-option {
  display: flex;
  align-items: center;
  height: 56px;
  gap: 1rem;
  padding: 0 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
  &:hover{
    background: rgba(138, 43, 226, 0.2);
    border-color: var(--primary-color);
    border: 1px solid  rgba(138, 43, 226, 1);
  }
  img{
    width: 30px;
    height: 30px;
  }
}


.wallet-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

/* 移动端适配 */
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

/* 小屏幕手机特殊调整 */
@media (max-width: 480px) {
  .connect-modal {
    padding: 1rem;
  }

  .modal-header h3 {
    font-size: 1.2rem;
  }
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

.twitter-btn {
  background: rgba(29, 161, 242, 0.2);
  color: #1da1f2;
  border: 1px solid rgba(29, 161, 242, 0.4);
}

.twitter-btn:not(:disabled):hover {
  background: rgba(29, 161, 242, 0.3);
}

.icon-tg, .icon-twitter {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-tg {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230088cc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.25 1.58-1.32 5.41-1.87 7.19-.14.44-.41.58-.68.58-.33 0-.52-.25-.81-.85-.45-1.58-.77-2.66-1.24-3.98-.53-1.47-1.12-2.11-1.81-2.16-.56-.04-.97.1-1.35.38-.38.28-.47.45-.77.45-.18 0-.45-.11-.69-.2-.36-.15-.69-.25-1.13-.25-.6 0-1.15.28-1.15.83 0 .44.5 1.03 1.09 1.67.93.97 1.25 1.55 2.11 2.53.68.78 1.47 1.45 2.27 1.45.56 0 .9-.14 1.28-.5.39-.37.27-.42.39-.73.12-.31.64-1.14.9-1.56.28-.45.56-.5.9-.5.22 0 .58.04.85.66l1.17 2.75c.16.38.31.54.56.54.14 0 .28-.07.39-.2.12-.14.16-.31.16-.5 0-.31-.09-.62-.18-.93-.25-.93-.62-1.86-.93-2.79-.25-.75-.5-1.5-.75-2.25-.08-.25-.17-.5-.25-.75-.08-.25-.17-.37-.33-.37-.08 0-.17.04-.25.12-.08.08-.12.17-.17.25z'/%3E%3C/svg%3E");
}

.icon-twitter {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231da1f2'%3E%3Cpath d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z'/%3E%3C/svg%3E");
}

/* 移动端适配 */
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
