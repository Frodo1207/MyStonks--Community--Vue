<template>
  <div class="activity-view">
    <ActivityDetail
        v-if="activity"
        :activity="activity"
    />
    <div v-else class="loading">
      {{ loadingMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useActivityStore } from '@/stores/activityStore'
import ActivityDetail from '@/components/ActivityDetail.vue'

const route = useRoute()
const activityStore = useActivityStore()
const loadingMessage = ref('加载中...')

const activity = computed(() => {
  const id = route.params.id
  const found = activityStore.getActivityById(id)

  if (!found && activityStore.activities.length > 0) {
    loadingMessage.value = '活动不存在'
  }

  return found
})

// 如果store为空，尝试重新加载
onMounted(async () => {
  if (activityStore.activities.length === 0) {
    try {
      const resp = await getAllEvents()
      const transformedData = transformActivityData(resp.data || [])
      activityStore.activities = transformedData
    } catch (err) {
      loadingMessage.value = '加载活动数据失败'
    }
  }
})
</script>
