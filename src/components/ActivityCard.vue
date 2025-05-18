<template>
  <div class="activity-card" @click="navigateToDetail">
    <div class="cover-container">
      <img :src="activity.cover" :alt="activity.title" class="cover-image">
      <div class="heat-badge">
        <span class="heat-icon">🔥</span>
        {{ activity.heat }}
      </div>
    </div>
    <h3 class="title">{{ activity.title }}</h3>
    <div class="meta">
      <span>{{ formatDate(activity.startTime) }}</span>
      <span>•</span>
      <span>{{ activity.location }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const navigateToDetail = () => {
  router.push({ name: 'activity', params: { id: props.activity.id } })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.activity-card {
  border-radius: 12px;
  overflow: hidden;
  background: #1E1E1E;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
}

.cover-container {
  position: relative;
  width: 100%;
  height: 160px;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heat-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.heat-icon {
  margin-right: 4px;
}

.title {
  padding: 12px;
  margin: 0;
  font-size: 16px;
  color: white;
}

.meta {
  padding: 0 12px 12px;
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: #888;
}
</style>
