<template>
  <Banner/>

  <div class="home-view">
    <div v-if="loading" class="loading-container">
      加载中...
    </div>

    <div v-if="error" class="error-container">
      加载活动失败: {{ error }}
    </div>

    <ActivityList
        v-if="!loading && !error && sortedActivities.length > 0"
        title="热门活动"
        :activities="sortedActivities"
    />

    <div v-if="!loading && !error && sortedActivities.length === 0" class="empty-container">
      暂无活动数据
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useActivityStore } from '@/stores/activityStore'
import ActivityList from '@/components/ActivityList.vue'
import { ref, onMounted } from 'vue'
import Banner from '@/components/Banner.vue'
import { getAllEvents } from "@/services/events.js"

const activityStore = useActivityStore()
const { sortedActivities } = storeToRefs(activityStore)
const loading = ref(false)
const error = ref(null)

// 确保ID统一转换为字符串
const transformActivityData = (apiData) => {
  if (!Array.isArray(apiData)) return []

  return apiData.map(item => ({
    id: String(item.id), // 确保ID为字符串类型
    title: item.title || '未命名活动',
    cover: item.cover_image_url || '',
    heat: Number(item.popularity) || 0,
    description: item.description || '',
    startTime: item.start_time || '',
    endTime: item.end_time || '',
    location: item.location || '线上',
    organizer: item.created_by || '未知组织者'
  })).filter(item => item.id)
}

onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    const resp = await getAllEvents()
    let res = resp.data

    // 统一处理API响应
    const apiData = Array.isArray(res) ? res : (res?.data || [])
    const transformedData = transformActivityData(apiData)

    // 更新store
    activityStore.$patch({
      activities: transformedData
    })

    console.log('活动数据已加载:', transformedData)
  } catch (err) {
    console.error('加载失败:', err)
    error.value = err.message || '加载失败'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.loading-container,
.error-container,
.empty-container {
  padding: 2rem;
  text-align: center;
  background: rgba(30, 30, 46, 0.8);
  border-radius: 12px;
  margin: 1rem 0;
  color: white;
}

.error-container {
  color: #ff6b6b;
}

.empty-container {
  color: rgba(255, 255, 255, 0.6);
}
</style>
