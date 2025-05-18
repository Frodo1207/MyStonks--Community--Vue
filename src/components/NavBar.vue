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
        <div class="wallet-connect" @click="emit('connect')">
          <span v-if="!connected">连接钱包</span>
          <span v-else class="wallet-address">{{ truncatedAddress }}</span>
        </div>
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <div class="hamburger" :class="{ 'active': showMobileMenu }"></div>
        </button>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  connected: Boolean,
  walletAddress: String,
  logoPart1: {
    type: String,
    default: 'MyStonks'
  },
  logoPart2: {
    type: String,
    default: '社区活动'
  }
});

const emit = defineEmits(['connect']);

const showMobileMenu = ref(false);
const navLinks = ref([
  { path: '/', name: '首页' },
  { path: '/activities', name: '链上活动' },
  { path: '/governance', name: '社区治理' },
  { path: '/merch', name: '社区周边' }
]);

const truncatedAddress = computed(() => {
  if (props.walletAddress.length > 0) {
    return `${props.walletAddress.substring(0, 6)}...${props.walletAddress.substring(38)}`;
  }
  return '';
});

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<style scoped>
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

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.wallet-connect {
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

.wallet-connect:hover {
  background: rgba(138, 43, 226, 0.3);
  transform: translateY(-1px);
}

.wallet-address {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }

  .logo {
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .wallet-connect {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .wallet-address {
    max-width: 120px;
  }
}

@media (max-width: 480px) {
  .logo span {
    display: none;
  }

  .wallet-address {
    max-width: 100px;
  }
}
</style>
