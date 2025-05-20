<template>

  <!-- 新版欢迎Banner -->
  <Banner/>
  <div class="home-view">
    <ActivityList
        title="热门活动"
        :activities="sortedActivities"
    />
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useActivityStore } from '@/stores/activityStore'
  import ActivityList from '@/components/ActivityList.vue'
  import { onMounted } from 'vue'
  import Banner from '@/components/Banner.vue';

  const activityStore = useActivityStore()
  const { sortedActivities } = storeToRefs(activityStore)

  // 打印检查数据
  console.log('Initial sortedActivities:', sortedActivities.value)

  onMounted(() => {
  // 组件挂载后再次打印，确保数据已加载
  console.log('sortedActivities after mount:', sortedActivities.value)

  // 如果需要，可以在这里调用action来加载数据
  // activityStore.fetchActivities()
})

  // 如果数据是异步加载的，可以添加一个watcher
  // import { watch } from 'vue'
  // watch(sortedActivities, (newVal) => {
//   console.log('sortedActivities changed:', newVal)
// }, { deep: true })

</script>

<style scoped>
.home-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
