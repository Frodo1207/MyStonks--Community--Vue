<template>
  <div class="other-tasks-section">
    <div class="section-title">
      <h2>其他任务</h2>
      <span class="subtitle">探索更多获取积分的方式</span>
    </div>

    <div class="other-tasks-grid">
      <div v-for="task in tasks" :key="task.id" class="other-task-card">
        <div class="card-header">
          <div class="task-category">{{ task.category }}</div>
          <div class="task-reward">+{{ task.reward }} 积分</div>
        </div>
        <div class="card-body">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
        </div>
        <div class="card-footer">
          <button
              class="task-action"
              :class="{ completed: task.completed }"
              @click="handleAction(task)"
          >
            {{ task.completed ? '已完成' : '开始任务' }}
          </button>
          <div v-if="task.progress" class="task-progress">
            <div class="progress-bar">
              <div
                  class="progress-fill"
                  :style="{ width: `${task.progress}%` }"
              ></div>
            </div>
            <span class="progress-text">{{ task.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['action'])

const handleAction = (task) => {
  emit('action', task)
}
</script>

<style scoped>
.other-tasks-section {
  margin: 2rem 0 3rem;
}

.section-title {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-title h2 {
  font-size: 1.5rem;
  margin: 0;
}

.section-title .subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.other-tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.other-task-card {
  background: rgba(30, 30, 46, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(138, 43, 226, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.other-task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(138, 43, 226, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background: rgba(138, 43, 226, 0.1);
  border-bottom: 1px solid rgba(138, 43, 226, 0.2);
}

.task-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.7);
}

.task-reward {
  font-size: 0.9rem;
  font-weight: bold;
  color: #FFD700;
}

.card-body {
  padding: 1.2rem 1.2rem 1.5rem;
  flex: 1;
}

.card-body h3 {
  margin: 0 0 0.8rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.card-body p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.card-footer {
  padding: 0 1.2rem 1.2rem;
}

.task-action {
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(138, 43, 226, 0.6));
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  margin-bottom: 0.8rem;
}

.task-action:hover {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.9), rgba(138, 43, 226, 0.7));
}

.task-action.completed {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  cursor: default;
}

.task-progress {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-light), #9c27b0);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .other-tasks-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>
