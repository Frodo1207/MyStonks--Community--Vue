<template>
  <section class="banner">
    <div class="banner-container">
      <div class="banner-inner">
        <div class="banner-grid">
          <div class="text-content">
            <h1 class="gradient-text">
              <div>
                欢迎来到
              </div>
              <div class="neon-title">
                <span v-for="(word, index) in animatedTitle" :key="index">
                  {{ word }}
                </span>
              </div>
            </h1>
            <!-- 添加社交链接 -->
            <div class="social-links">
              <a href="https://x.com/MyStonks_Org" target="_blank" class="social-icon" aria-label="X (formerly Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.6 4h2.8l-6 7.6 7 9.2h-5.5l-4.3-5.6-4.9 5.6H3.6l6.5-8.2L3 4h5.6l3.9 5.1L18.6 4zm-1.4 15.1h2.2L7.5 5.5H5.2l12 13.6z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://t.me/STONKSOPEN" target="_blank" class="social-icon" aria-label="Telegram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.05 5.56-5.022c.242-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.643-.203-.658-.643.135-.954l11.566-4.458c.537-.196 1.006.128.832.941z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            <div class="deco-line"></div>
            <p class="subtitle">
              <span v-html="formattedSubtitle"></span>
            </p>
          </div>
          <div class="image-placeholder">
            <!-- 轮播图区域 - 添加相对定位容器 -->
            <div class="carousel-wrapper">
              <div class="carousel-container">
                <div class="carousel" :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }">
                  <div v-for="(image, index) in images" :key="index" class="carousel-item">
                    <img :src="image" alt="轮播图" class="featured-image" />
                  </div>
                </div>
              </div>
              <!-- 放置在图片内部的进度条 -->
              <div class="carousel-progress-inner">
                <div class="progress-container-inner">
                  <div
                      v-for="(image, index) in images"
                      :key="'progress-inner-'+index"
                      class="progress-track-inner"
                      @click="setCurrentImage(index)"
                  >
                    <div
                        class="progress-indicator-inner"
                        :class="{ active: currentImageIndex === index }"
                    >
                      <div
                          class="progress-fill-inner"
                          :style="{ width: currentImageIndex === index ? '100%' : '0%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  titlePart1: {
    type: String,
    default: '欢迎加入'
  },
  titleHighlight: {
    type: String,
    default: 'MyStonks DAO'
  },
  titleHighlight2: {
    type: String,
    default: '你的财富发源地'
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

const currentTitle = ref(0);
const animatedText = ref('');
const isTyping = ref(false);
const isDeleting = ref(false);
const typingSpeed = 50; // 打字速度(ms)
const deletingSpeed = 50; // 删除速度(ms)
const titles = [props.titleHighlight, props.titleHighlight2];

import cover1 from '@/images/cover1.png';
import cover2 from '@/images/cover2.png';
import cover3 from '@/images/cover3.png';

// 轮播图相关状态
const currentImageIndex = ref(0);
const progress = ref(0);
const images = ref([
  cover1, cover2, cover3,
]);

// 打字机效果
const typeWriter = (text, i, callback) => {
  if (i < text.length) {
    animatedText.value = text.substring(0, i + 1);
    setTimeout(() => {
      typeWriter(text, i + 1, callback);
    }, typingSpeed);
  } else {
    callback();
  }
};

// 删除效果
const deleteText = (text, i, callback) => {
  if (i >= 0) {
    animatedText.value = text.substring(0, i);
    setTimeout(() => {
      deleteText(text, i - 1, callback);
    }, deletingSpeed);
  } else {
    callback();
  }
};

// 循环切换标题
const cycleTitles = () => {
  const currentIndex = currentTitle.value;
  const nextIndex = (currentIndex + 1) % titles.length;

  isTyping.value = true;
  isDeleting.value = false;

  typeWriter(titles[nextIndex], 0, () => {
    isTyping.value = false;
    setTimeout(() => {
      isDeleting.value = true;
      deleteText(animatedText.value, animatedText.value.length, () => {
        currentTitle.value = nextIndex;
        isDeleting.value = false;
        setTimeout(cycleTitles, 1000); // 停留1秒后开始下一个循环
      });
    }, 1000); // 停留1秒后开始删除
  });
};

onMounted(() => {
  // 初始化显示第一个标题
  typeWriter(titles[0], 0, () => {
    isTyping.value = false;
    // 3秒后开始循环
    setTimeout(cycleTitles, 3000);
  });

  // 轮播图自动切换
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
    progress.value = ((currentImageIndex.value + 1) / images.value.length) * 100;
  }, 5000); // 每5秒切换一次图片
});

onBeforeUnmount(() => {
  // 清除可能的定时器
});

const animatedTitle = computed(() => {
  return animatedText.value.split('');
});

const formattedSubtitle = computed(() => {
  return `探索<span class="highlight">${props.highlightNumber}+</span>${props.subtitleLines[0]}<br>
          赢取${props.subtitleLines[1]}`;
});
</script>

<style scoped>/* 新增社交链接样式 */
.social-links {
  display: flex;
  gap: 16px;
  margin-bottom: 1.5rem;
}

.social-icon {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-icon:hover {
  color: var(--primary-light);
  background: rgba(138, 43, 226, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.3);
}

.social-icon svg {
  width: 18px;
  height: 18px;
}

/* 轮播图样式 */
.carousel-container {
  position: relative;
  height: 320px; /* 高度固定 */
  overflow: hidden;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 1;
  min-width: 100%;
}

.featured-image {
  width: 100%; /* 宽度自适应 */
  height: 100%; /* 高度撑满容器 */
  object-fit: cover; /* 保持比例且覆盖区域 */
  border: none;
}

/* 进度条样式 */
.progress-bar-container {
  margin-top: 10px; /* 给进度条和轮播图之间增加一点间距 */
  padding: 0 10px;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #7e5be5, #e4b6f2); /* 渐变色效果 */
  border-radius: 10px;
  transition: width 0.3s ease;
}

/* 原有样式保持不变... */
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
  grid-template-columns: 0.9fr 1.6fr;
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
  display: inline-block;
}

.neon-title span {
  display: inline-block;
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

/* 响应式调整 */
@media (max-width: 992px) {
  .image-placeholder {
    height: 250px;
  }
}

@media (max-width: 576px) {
  .image-placeholder {
    height: 200px;
  }

  .social-links {
    gap: 12px;
  }

  .social-icon {
    width: 32px;
    height: 32px;
  }

  .social-icon svg {
    width: 16px;
    height: 16px;
  }
}
/* 新增轮播图包装器样式 */
.carousel-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* 图片容器样式保持不变 */
.carousel-container {
  position: relative;
  height: 320px;
  overflow: hidden;
}

/* 放置在图片内部的进度条样式 */
.carousel-progress-inner {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
}

.progress-container-inner {
  display: flex;
  gap: 6px;
  width: 50%; /* 进度条宽度为图片宽度的50% */
  max-width: 200px; /* 最大宽度限制 */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  padding: 8px 12px;
  border-radius: 20px;
}

.progress-track-inner {
  flex: 1;
  height: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.progress-indicator-inner {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.progress-indicator-inner.active {
  height: 3px;
}

.progress-fill-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--primary-light);
  border-radius: 2px;
  transition: width 0.1s linear;
}

/* 悬停效果 */
.progress-track-inner:hover .progress-indicator-inner {
  background: rgba(255, 255, 255, 0.5);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .carousel-container {
    height: 250px;
  }

  .progress-container-inner {
    width: 60%;
    padding: 6px 10px;
  }
}

@media (max-width: 576px) {
  .carousel-container {
    height: 200px;
  }

  .carousel-progress-inner {
    bottom: 12px;
  }

  .progress-container-inner {
    width: 70%;
    max-width: 180px;
    padding: 4px 8px;
  }

  .progress-indicator-inner {
    height: 2px;
  }
}
</style>
