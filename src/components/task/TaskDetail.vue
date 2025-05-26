<!-- components/TaskDetail.vue -->
<template>
  <div class="task-detail">
    <div class="modal-overlay" @click.self="$emit('close')"></div>

    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>

      <div class="content-header">
        <div class="title-section">
          <h2 class="title">{{ task.title }}</h2>
          <span class="priority" :class="task.priority">{{ getPriorityLabel(task.priority) }}</span>
        </div>
        <div class="status-section">
          <span class="status-badge" :class="task.status">{{ getStatusLabel(task.status) }}</span>
        </div>
      </div>

      <div class="content-body">
        <div class="description-section">
          <h3>任务描述</h3>
          <p class="description">{{ task.description }}</p>
        </div>

        <div class="meta-section">
          <div class="meta-item">
            <span class="label">截止日期</span>
            <span class="value">{{ formatDate(task.dueDate) }}</span>
          </div>
          <div class="meta-item">
            <span class="label">负责人</span>
            <span class="value">{{ task.assignee }}</span>
          </div>
          <div class="meta-item">
            <span class="label">创建时间</span>
            <span class="value">{{ formatDate(task.createdAt) }}</span>
          </div>
        </div>

        <div class="progress-section" v-if="task.progress !== undefined">
          <h3>完成进度</h3>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${task.progress}%` }"
            ></div>
          </div>
          <span class="progress-text">{{ task.progress }}%</span>
        </div>

        <div class="comments-section" v-if="task.comments && task.comments.length">
          <h3>评论</h3>
          <div class="comments-list">
            <div 
              v-for="comment in task.comments" 
              :key="comment.id"
              class="comment-item"
            >
              <div class="comment-header">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-time">{{ formatDate(comment.time) }}</span>
              </div>
              <p class="comment-content">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-footer">
        <button class="action-btn edit" @click="editTask">编辑任务</button>
        <button class="action-btn delete" @click="deleteTask">删除任务</button>
      </div>
    </div>
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

const emit = defineEmits(['close'])

const getPriorityLabel = (priority) => {
  const labels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
  return labels[priority] || '普通'
}

const getStatusLabel = (status) => {
  const labels = {
    todo: '待处理',
    'in-progress': '进行中',
    completed: '已完成'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  return format(new Date(date), 'yyyy/MM/dd HH:mm')
}

const editTask = () => {
  console.log('实现编辑任务的逻辑')
}

const deleteTask = () => {
  console.log('实现删除任务的逻辑')
}
</script>

<style scoped>
.task-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  background: rgba(30, 30, 46, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.content-header {
  margin-bottom: 2rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.title {
  color: white;
  font-size: 1.8rem;
  margin: 0;
}

.priority {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
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

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.status-badge.todo {
  background: rgba(255, 167, 38, 0.2);
  color: #FFA726;
}

.status-badge.in-progress {
  background: rgba(66, 165, 245, 0.2);
  color: #42A5F5;
}

.status-badge.completed {
  background: rgba(102, 187, 106, 0.2);
  color: #66BB6A;
}

.content-body {
  margin-bottom: 2rem;
}

.description-section {
  margin-bottom: 2rem;
}

.description-section h3,
.progress-section h3,
.comments-section h3 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.description {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.meta-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.value {
  color: white;
  font-size: 1rem;
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
  font-size: 0.9rem;
}

.comments-list {
  display: grid;
  gap: 1rem;
}

.comment-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.comment-author {
  color: white;
  font-weight: 500;
}

.comment-time {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.comment-content {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
}

.content-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.edit {
  background: var(--primary-color);
  color: white;
  border: none;
}

.action-btn.delete {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
  border: 1px solid #F44336;
}

.action-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .meta-section {
    grid-template-columns: 1fr;
  }

  .content-footer {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style> 