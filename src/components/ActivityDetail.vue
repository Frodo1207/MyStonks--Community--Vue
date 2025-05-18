<template>
  <div class="activity-detail">
    <div class="cover-container">
      <img :src="activity.cover" :alt="activity.title" class="cover-image">
      <div class="heat-badge">
        <span class="heat-icon">🔥</span>
        {{ activity.heat }}
      </div>
    </div>

    <div class="content">
      <h1 class="title">{{ activity.title }}</h1>

      <div class="meta">
        <div class="meta-item">
          <span class="meta-label">时间</span>
          <span class="meta-value">
<!--            {{ formatDate(activity.startTime) }} - {{ formatDate(activity.endTime) }}-->
          </span>
        </div>
        <div class="meta-item">
          <span class="meta-label">地点</span>
          <span class="meta-value">{{ activity.location }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">主办方</span>
          <span class="meta-value">{{ activity.organizer }}</span>
        </div>
      </div>

      <div class="description">
        <h3>活动详情</h3>
        <p>{{ activity.description }}</p>
      </div>

      <button class="join-button" @click="joinActivity">参加活动</button>
    </div>
  </div>
</template>

<script setup>
// import { formatDate } from '@/utils/formatDate'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const joinActivity = () => {
  // 这里可以添加 Web3 交互逻辑，比如连接钱包、签名等
  console.log('Joining activity:', props.activity.id)
}
</script>

<style scoped>
.activity-detail {
  max-width: 800px;
  margin: 0 auto;
  background: #1E1E1E;
  border-radius: 12px;
  overflow: hidden;
}

.cover-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heat-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.content {
  padding: 24px;
}

.title {
  color: white;
  margin: 0 0 20px;
}

.meta {
  margin-bottom: 30px;
}

.meta-item {
  display: flex;
  margin-bottom: 10px;
}

.meta-label {
  color: #888;
  min-width: 80px;
}

.meta-value {
  color: white;
}

.description {
  margin-bottom: 30px;
}

.description h3 {
  color: white;
  margin-bottom: 10px;
}

.description p {
  color: #ccc;
  line-height: 1.6;
}

.join-button {
  background: #6200EE;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.join-button:hover {
  background: #7C4DFF;
}
</style>
