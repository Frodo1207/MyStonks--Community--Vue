<template>
  <div class="activity-list">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div class="grid">
      <ActivityCard
          v-for="activity in activities"
          :key="activity.id"
          :activity="activity"
      />
    </div>
  </div>
</template>

<script setup>
import ActivityCard from './ActivityCard.vue'

defineProps({
  activities: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.section-title {
  color: white;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
