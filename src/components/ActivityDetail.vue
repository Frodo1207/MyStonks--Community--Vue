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
            {{ formatDate(activity.startTime) }} - {{ formatDate(activity.endTime) }}
          </span>
        </div>
        <div class="meta-item">
          <span class="meta-label">地点</span>
          <span class="meta-value">{{ activity.location }}</span>
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
const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return '待定'

  try {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return '日期格式错误'
    }

    // 添加时区选项，强制使用UTC
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'  // 关键添加
    }

    return new Intl.DateTimeFormat('zh-CN', options).format(date)
  } catch (error) {
    console.error('日期格式化错误:', error)
    return dateString
  }
}

const joinActivity = () => {
  console.log('Joining activity:', props.activity.id)
  // 这里可以添加 Web3 交互逻辑
}
</script>

<style scoped>
.activity-detail {
  max-width: 800px;
  margin: 0 auto;
  background: #1E1E1E;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  gap: 4px;
}

.heat-icon {
  font-size: 18px;
}

.content {
  padding: 24px;
}

.title {
  color: white;
  margin: 0 0 20px;
  font-size: 28px;
}

.meta {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
}

.meta-item {
  display: flex;
  margin-bottom: 10px;
}

.meta-item:last-child {
  margin-bottom: 0;
}

.meta-label {
  color: #888;
  min-width: 80px;
  font-weight: 500;
}

.meta-value {
  color: white;
  flex: 1;
}

.description {
  margin-bottom: 30px;
}

.description h3 {
  color: white;
  margin-bottom: 10px;
  font-size: 20px;
}

.description p {
  color: #ccc;
  line-height: 1.6;
  white-space: pre-line;
}

.join-button {
  background: #6200EE;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  font-weight: 600;
}

.join-button:hover {
  background: #7C4DFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(98, 0, 238, 0.3);
}

.join-button:active {
  transform: translateY(0);
}
</style>
