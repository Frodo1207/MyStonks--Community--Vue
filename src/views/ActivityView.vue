<template>
  <div class="activity-view">
    <ActivityDetail
        v-if="activity"
        :activity="activity"
    />
    <div v-else class="loading">
      活动不存在或正在加载...
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useActivityStore } from '@/stores/activityStore'
import ActivityDetail from '@/components/ActivityDetail.vue' // 添加这行导入

const route = useRoute()
const activityStore = useActivityStore()

const activity = computed(() => {
  return activityStore.getActivityById(route.params.id)
})
</script>
