<!-- components/Banner.vue -->
<template>
  <section class="banner">
    <div class="banner-container">
      <div class="banner-inner">
        <div class="banner-grid">
          <div class="text-content">
            <h1 class="gradient-text">
              {{ titlePart1 }}
              <span class="neon-title">{{ titleHighlight }}</span>
            </h1>
            <div class="deco-line"></div>
            <p class="subtitle">
              <span v-html="formattedSubtitle"></span>
            </p>
          </div>
          <div class="image-placeholder">
            <div class="animated-backdrop"></div>
            <span class="placeholder-text">{{ placeholderText }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  titlePart1: {
    type: String,
    default: '欢迎加入'
  },
  titleHighlight: {
    type: String,
    default: 'MyStonks未来社区'
  },
  highlightNumber: {
    type: Number,
    default: 100
  },
  subtitleLines: {
    type: Array,
    default: () => ['优质链上资产', '独家数字权益']
  },
  placeholderText: {
    type: String,
    default: 'NFT Collection Preview'
  }
});

const formattedSubtitle = computed(() => {
  return `探索<span class="highlight">${props.highlightNumber}+</span>${props.subtitleLines[0]}<br>
          赢取${props.subtitleLines[1]}`;
});
</script>

<style scoped>
/* Banner容器样式 */
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

.image-placeholder {
  position: relative;
  background: rgba(138, 43, 226, 0.08);
  border: 2px dashed var(--primary-color);
  border-radius: 12px;
  height: 320px;
  overflow: hidden;
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

/* 动画定义 */
@keyframes neon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes backdrop-flow {
  0% { transform: translate(-30%, -30%) rotate(45deg); }
  100% { transform: translate(30%, 30%) rotate(45deg); }
}

/* 响应式设计 */
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
  .banner-grid {
    padding: 1.5rem;
  }

  .gradient-text {
    font-size: 2.2rem;
  }
}

@media (max-width: 576px) {
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
</style>
