<template>
  <div class="community-merch-view">
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

    <!-- 主内容区 -->
    <main class="merch-container">
      <!-- 标题区 -->
      <div class="header-section">
        <h1 class="page-title">
          <span class="gradient-text">社区周边</span>
        </h1>
        <p class="page-description">收藏专属Web3文化，展现区块链信仰</p>
      </div>

      <!-- 过滤选项 -->
      <div class="filter-controls">
        <button
            v-for="category in categories"
            :key="category.value"
            :class="['filter-btn', { active: activeCategory === category.value }]"
            @click="activeCategory = category.value"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- 周边商品列表 -->
      <div class="merch-grid">
        <MerchCard
            v-for="item in filteredMerch"
            :key="item.id"
            :item="item"
            @click="handleMerchClick(item.id)"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMerchStore } from '@/stores/merchStore'
import MerchCard from '@/components/MerchCard.vue'

const merchStore = useMerchStore()
const activeCategory = ref('all')

// 商品分类选项
const categories = [
  { label: '全部', value: 'all' },
  { label: '服饰', value: 'apparel' },
  { label: '数码', value: 'gadgets' },
  { label: '艺术品', value: 'art' },
  { label: '收藏品', value: 'collectibles' }
]

// 过滤后的商品列表
const filteredMerch = computed(() => {
  if (activeCategory.value === 'all') return merchStore.merchItems
  return merchStore.merchItems.filter(item => item.category === activeCategory.value)
})

const handleMerchClick = (id) => {
  // 处理点击事件，例如跳转详情页
  console.log('Selected merch ID:', id)
}
</script>

<style scoped>
.community-merch-view {
  position: relative;
  min-height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(45deg, #0f0f1a 30%, #1a1a2f);
}

.merch-container {
  position: relative;
  max-width: var(--container-width);
  margin: 0 auto;
  z-index: 1;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(45deg, #8A2BE2, #E200FA);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active {
  background: var(--primary-color);
  color: white;
}

.merch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* 调整最小宽度 */
  gap: 1.5rem; /* 减小间距 */
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .merch-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .merch-container {
  }

  .merch-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
