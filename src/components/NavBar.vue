<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <span>{{ logoPart1 }}</span>
      </router-link>

      <div class="nav-links" :class="{ 'mobile-menu': showMobileMenu }">
        <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="nav-item"
            active-class="active-link"
            @click="showMobileMenu = false"
        >
          {{ link.name }}
        </router-link>
      </div>

      <div class="nav-right">
        <div v-if="connected" class="wallet-connected" @click="openModal">
          <span class="wallet-address">{{ truncatedAddress }}</span>
          <span class="connected-indicator"></span>
        </div>
        <div v-else class="connect-btn" @click="openModal">Connect</div>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <div class="hamburger" :class="{ 'active': showMobileMenu }"></div>
        </button>
      </div>
    </div>

    <!-- 使用独立的钱包连接组件 -->
    <WalletModal
        v-model:show-modal="showConnectModal"
        :wallet-address="walletAddress"
        @disconnect="disconnectWallet"
    />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWallet } from 'solana-wallets-vue';
import WalletModal from './WalletModal.vue';

const { connected, publicKey, disconnect } = useWallet();

const showConnectModal = ref(false);
const showMobileMenu = ref(false);
const isLoggedIn = ref(false); // 新增登录状态
const hasTelegram = ref(false); // 新增Telegram绑定状态
const telegramUsername = ref(''); // 新增Telegram用户名

const props = defineProps({
  logoPart1: {
    type: String,
    default: 'MyStonks'
  },
  logoPart2: {
    type: String,
    default: '社区活动'
  }
});

const navLinks = ref([
  { path: '/', name: '首页' },
  { path: '/taskcenter', name: '任务中心' },
  { path: '/activities', name: '社区活动' },
  { path: '/governance', name: '社区治理' },
  { path: '/merch', name: '社区周边' }
]);

// 组件挂载时检查本地存储
onMounted(() => {
  checkLoginStatus();
});

// 检查登录状态函数
const checkLoginStatus = () => {
  if (!connected) {
    clearLocalStorage();
    return
  }
  const addr = localStorage.getItem("solAddr");
  const token = localStorage.getItem("access_token");
  const tgId = localStorage.getItem("tg_id");
  const tgName = localStorage.getItem("tg_name");

  // 如果有地址和token，则认为是已登录状态
  if (addr && token) {
    isLoggedIn.value = true;
    // 检查是否绑定了Telegram
    if (tgId && tgId !== "0") {
      hasTelegram.value = true;
      telegramUsername.value = tgName || "Telegram用户";
    }
  }
};

const walletAddress = computed(() => {
  return publicKey.value?.toString() || localStorage.getItem("solAddr") || '';
});

const truncatedAddress = computed(() => {
  const address = walletAddress.value;
  if (address) {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  }
  return '';
});

const openModal = () => {
  showConnectModal.value = true;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

// 断开钱包连接
const disconnectWallet = async () => {
  try {
    await disconnect();
    clearLocalStorage();
    isLoggedIn.value = false;
    hasTelegram.value = false;
    telegramUsername.value = '';
    emit('disconnect');
  } catch (error) {
    console.error('断开连接失败:', error);
  }
};

// 清除本地存储
const clearLocalStorage = () => {
  localStorage.removeItem("solAddr");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("tg_id");
  localStorage.removeItem("tg_name");
  localStorage.removeItem("tg_photo");
};
</script>

<style scoped>
/* 原有的样式保持不变 */
.navbar {
  position: sticky;
  top: 0;
  background: rgba(30, 30, 46, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  padding: 0.8rem 0;
}

.nav-container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.3s;
  text-decoration: none;
}

.logo:hover {
  background: rgba(138, 43, 226, 0.1);
}

.logo span {
  background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s;
  position: relative;
}

.nav-item:hover {
  color: var(--primary-light);
  background: rgba(138, 43, 226, 0.1);
}

.active-link {
  color: var(--primary-light);
  font-weight: 500;
}

.active-link::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 2px;
  background: var(--primary-color);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.wallet-connected {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(46, 204, 113, 0.2);
  border: 1px solid rgba(46, 204, 113, 0.5);
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: default;
}

.connected-indicator {
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.disconnect-btn {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.5);
  border-radius: 4px;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
}

.disconnect-btn:hover {
  background: rgba(231, 76, 60, 0.3);
}

.connect-btn {
  background: rgba(138, 43, 226, 0.2);
  border: 1px solid var(--primary-color);
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.3s;
  cursor: pointer;
}

.connect-btn:hover {
  background: rgba(138, 43, 226, 0.3);
  transform: translateY(-1px);
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 5px rgba(46, 204, 113, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .wallet-connected {
    padding: 0.6rem 1rem;
    gap: 0.6rem;
  }

  .disconnect-btn {
    padding: 0.1rem 0.4rem;
  }
}

/* 移动端菜单 */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.hamburger {
  width: 24px;
  height: 2px;
  background: white;
  position: relative;
  transition: all 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: white;
  transition: all 0.3s;
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  top: 6px;
}

.hamburger.active {
  background: transparent;
}

.hamburger.active::before {
  transform: rotate(45deg) translate(4px, 4px);
}

.hamburger.active::after {
  transform: rotate(-45deg) translate(4px, -4px);
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    background: rgba(30, 30, 46, 0.95);
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s;
  }

  .nav-links.mobile-menu {
    transform: translateY(0);
    opacity: 1;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-item {
    padding: 1rem;
    text-align: center;
  }

  .active-link::after {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    position: relative;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(30, 30, 46, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 1rem 0;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-links.mobile-menu {
    transform: translateY(0);
    opacity: 1;
  }

  .nav-item {
    padding: 1rem 1.5rem;
    text-align: left;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .nav-item:hover {
    background: rgba(138, 43, 226, 0.15);
  }

  .active-link {
    color: var(--primary-light);
    background: rgba(138, 43, 226, 0.1);
  }

  .mobile-menu-btn {
    display: block;
    z-index: 1001;
  }

  .connect-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    margin-right: 0.5rem;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 1.2rem;
  }

  .connect-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .nav-links {
    top: 56px;
  }
}
</style>
