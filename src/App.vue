<template>
  <div id="app">
    <!-- 导航栏 -->
    <NavBar
        :connected="connected"
        :wallet-address="walletAddress"
        @connect="connectWallet"
    />
    <!-- 动态背景光点 -->
    <div class="glow-effects">
      <div
          v-for="i in 15"
          :key="i"
          class="glow-point"
          :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 2 + 's'
        }"
      ></div>
    </div>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="content-container">
        <router-view />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <p>© 2025 MyStonks DAO. 基于共识构建</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';

import { useWallet } from 'solana-wallets-vue'
// import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'

const { publicKey, connected, wallet, sendTransaction } = useWallet()





</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* 配色方案 */
  --primary-color: #8A2BE2;
  --primary-dark: #4B0082;
  --primary-light: #E200FA;
  --background: #0f0f1a;
  --surface: rgba(30, 30, 46, 0.4);
  --glow: #9400D3;

  /* 布局尺寸 */
  --container-width: 1200px;
}

/* 基础布局 */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(45deg, var(--background) 30%, #1a1a2f);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
}

/* ========== 导航栏样式 ========== */
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

/* ========== Banner样式 ========== */
.banner-container {
  width: 100%;
  max-width: var(--container-width);
  margin: 2rem auto;
  padding: 0 20px;
}

.banner-inner {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.banner-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  padding: 4rem;
}

.text-content {
  text-align: left;
}

.gradient-text {
  font-size: 2.8rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.neon-title {
  display: block;
  color: var(--primary-light);
  text-shadow: 0 0 15px var(--primary-color);
  animation: neon-pulse 2s ease-in-out infinite;
}

.deco-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(
      90deg,
      var(--primary-color),
      rgba(255, 255, 255, 0.5),
      transparent
  );
  margin: 2rem 0;
}

.subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
}

.highlight {
  color: var(--primary-light);
  font-weight: bold;
  margin: 0 0.3rem;
}

.animated-backdrop {
  position: absolute;
  width: 150%;
  height: 150%;
  background: linear-gradient(
      45deg,
      transparent 25%,
      rgba(138, 43, 226, 0.1) 50%,
      transparent 75%
  );
  animation: backdrop-flow 8s linear infinite;
}

.placeholder-text {
  position: relative;
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.1rem;
  z-index: 1;
}

/* ========== 主要内容区域 ========== */
.main-content {
  flex: 1;
  padding: 3rem 0;
  position: relative;
  z-index: 1;
}

.content-container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 0px;
}

/* ========== 页脚样式 ========== */
.footer {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer-container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* ========== 动画定义 ========== */
@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.4); opacity: 0.9; }
}

@keyframes neon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes backdrop-flow {
  0% { transform: translate(-30%, -30%) rotate(45deg); }
  100% { transform: translate(30%, 30%) rotate(45deg); }
}

/* ========== 响应式设计 ========== */
@media (max-width: 1200px) {
  .banner-grid {
    padding: 3rem;
  }
}

@media (max-width: 992px) {
  .banner-grid {
    grid-template-columns: 1fr;
    padding: 2rem;
  }

  .image-placeholder {
    height: 250px;
  }
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

  .gradient-text {
    font-size: 2.2rem;
  }

  .banner-inner {
    padding: 1.5rem;
  }
}

@media (max-width: 576px) {
  .logo span {
    display: none;
  }

  .wallet-address {
    max-width: 100px;
  }

  .gradient-text {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .image-placeholder {
    height: 200px;
  }
}
/* 动态背景效果 */
.glow-effects {
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}

.glow-point {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--primary-light);
  border-radius: 50%;
  filter: blur(2px);
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.4); opacity: 0.9; }
}
</style>
