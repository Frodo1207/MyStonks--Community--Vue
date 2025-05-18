<!-- components/MerchCard.vue -->
<template>
  <div class="merch-card" @click="$emit('click')">
    <!-- 商品图片 -->
    <div class="image-container">
      <img
          :src="item.image"
          :alt="item.title"
          class="merch-image"
          @error="handleImageError"
      >
      <div class="image-overlay"></div>
    </div>

    <!-- 商品信息 -->
    <div class="content">
      <div class="badge-group">
        <span class="category-badge">{{ item.categoryLabel }}</span>
        <span class="creator-badge">@{{ item.creator }}</span>
      </div>
      <h3 class="title">{{ item.title }}</h3>
      <p class="description">{{ item.description }}</p>
    </div>

    <!-- 动态流光效果 -->
    <div class="glow-effect"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const categoryLabels = {
  apparel: '服饰',
  gadgets: '数码',
  art: '艺术品',
  collectibles: '收藏品'
}

const item = computed(() => ({
  ...props.item,
  categoryLabel: categoryLabels[props.item.category] || '其他'
}))

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/400x300?text=Merch+Image'
}
</script>

<style scoped>
.merch-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  width: 240px; /* 调整卡片宽度 */
}

.merch-card:hover {
  transform: translateY(-3px); /* 减小悬停位移 */
}

.image-container {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.merch-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.merch-card:hover .merch-image {
  transform: scale(1.03); /* 减小缩放比例 */
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%);
}

.content {
  padding: 1rem; /* 减小内边距 */
}

.badge-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem; /* 减小间距 */
  flex-wrap: wrap;
}

.category-badge {
  background: rgba(138, 43, 226, 0.2);
  color: var(--primary-light);
  padding: 0.3rem 0.6rem; /* 调整尺寸 */
  border-radius: 12px;
  font-size: 0.7rem; /* 减小字号 */
}

.creator-badge {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.3rem 0.6rem; /* 调整尺寸 */
  border-radius: 12px;
  font-size: 0.7rem; /* 减小字号 */
}

.title {
  color: white;
  font-size: 0.9rem; /* 减小字号 */
  margin-bottom: 0.4rem; /* 减小间距 */
  line-height: 1.3;
}

.description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem; /* 减小字号 */
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 显示更多行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

/* 动态流光效果 */
.glow-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(138, 43, 226, 0.1),
      transparent
  );
  transition: left 0.6s ease;
}

.merch-card:hover .glow-effect {
  left: 100%;
}

@media (max-width: 768px) {
  .merch-card {
    width: 200px; /* 移动端更小尺寸 */
  }

  .content {
    padding: 0.8rem;
  }
}
</style>
