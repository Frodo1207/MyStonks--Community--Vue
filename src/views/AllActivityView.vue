<!-- AllActivities.vue -->
<template>
  <div class="all-activities">
    <ActivityList :activities="activities" title="全部活动" />
  </div>
</template>

<script setup>
import { useActivityStore } from '@/stores/activityStore.js' // 路径按实际调整
import { computed } from 'vue'
import ActivityList from '@/components/ActivityList.vue' // 路径按实际调整

const activityStore = useActivityStore()
const activities = computed(() => activityStore.sortedActivities) // 排序后展示（根据热度）
</script>

<style scoped>
.all-activities {
  padding: 40px;
  min-height: 100vh;
}
</style>
