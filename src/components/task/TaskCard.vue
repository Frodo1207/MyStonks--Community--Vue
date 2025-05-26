<!-- components/TaskCard.vue -->
<template>
  <div class="task-card" @click="$emit('click')">
    <!-- 任务状态标识 -->
    <div class="status-indicator" :class="task.status"></div>
    
    <!-- 任务内容 -->
    <div class="content">
      <div class="header">
        <h3 class="title">{{ task.title }}</h3>
        <span class="priority" :class="task.priority">{{ getPriorityLabel(task.priority) }}</span>
      </div>
      
      <p class="description">{{ task.description }}</p>
      
      <div class="meta">
        <div class="meta-item">
          <span class="icon">📅</span>
          <span>{{ formatDate(task.dueDate) }}</span>
        </div>
        <div class="meta-item">
          <span class="icon">👥</span>
          <span>{{ task.assignee }}</span>
        </div>
      </div>
      
      <!-- 进度条 -->
      <div class="progress-section" v-if="task.progress !== undefined">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${task.progress}%` }"
          ></div>
        </div>
        <span class="progress-text">{{ task.progress }}%</span>
      </div>
    </div>
    
    <!-- 动态流光效果 -->
    <div class="glow-effect"></div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const getPriorityLabel = (priority) => {
  const labels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
  return labels[priority] || '普通'
}

const formatDate = (date) => {
  return format(new Date(date), 'yyyy/MM/dd')
}
</script>

<style scoped>
.task-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-5px);
}

.status-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-radius: 2px;
}

.status-indicator.todo {
  background: #FFA726;
}

.status-indicator.in-progress {
  background: #42A5F5;
}

.status-indicator.completed {
  background: #66BB6A;
}

.content {
  padding-left: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.title {
  color: white;
  font-size: 1.1rem;
  margin: 0;
  flex: 1;
}

.priority {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 1rem;
}

.priority.high {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.priority.medium {
  background: rgba(255, 167, 38, 0.2);
  color: #FFA726;
}

.priority.low {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.icon {
  font-size: 1rem;
}

.progress-section {
  margin-top: 1rem;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.5s ease;
}

.progress-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
}

/* 动态流光效果 */
.glow-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(138, 43, 226, 0.1),
    transparent
  );
  transition: left 0.6s ease;
}

.task-card:hover .glow-effect {
  left: 100%;
}

@media (max-width: 768px) {
  .task-card {
    padding: 1rem;
  }
  
  .title {
    font-size: 1rem;
  }
  
  .meta {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style> 