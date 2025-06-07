<template>
  <div class="newbie-tasks-section">
    <div class="section-title">
      <h2>新手任务</h2>
      <span class="subtitle">完成这些任务快速入门</span>
    </div>

    <ul class="newbie-task-list">
      <li v-for="task in tasks" :key="task.id" class="newbie-task-item">
        <div class="task-info">
          <div class="task-icon">
            <span :class="['icon', task.completed ? 'completed' : '']">
              <i v-if="task.completed" class="fas fa-check"></i>
              <span v-else>{{ task.step }}</span>
            </span>
          </div>
          <div class="task-content">
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
          </div>
        </div>
        <div class="task-reward">
          <span class="reward-value">+{{ task.reward }}</span>
          <button
              class="task-action"
              :class="{ completed: task.completed }"
              @click="handleAction(task)"
          >
            {{ task.completed ? '已完成' : '去完成' }}
          </button>
        </div>
      </li>
    </ul>
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
.newbie-tasks-section {
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

.newbie-task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(30, 30, 46, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(138, 43, 226, 0.3);
  overflow: hidden;
}

.newbie-task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.newbie-task-item:last-child {
  border-bottom: none;
}

.newbie-task-item:hover {
  background: rgba(138, 43, 226, 0.1);
}

.task-info {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex: 1;
}

.task-icon .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(138, 43, 226, 0.2);
  color: var(--primary-light);
  font-weight: bold;
  font-size: 0.9rem;
}

.task-icon .icon.completed {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.task-content h3 {
  margin: 0 0 0.3rem;
  font-size: 1rem;
  font-weight: 500;
}

.task-content p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.task-reward {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.reward-value {
  font-size: 0.9rem;
  color: #FFD700;
  font-weight: bold;
}

.task-action {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  background: rgba(138, 43, 226, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.task-action:hover {
  background: rgba(138, 43, 226, 0.7);
}

.task-action.completed {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  cursor: default;
}

@media (max-width: 768px) {
  .newbie-task-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .task-reward {
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding-top: 0.5rem;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
    margin-top: 0.5rem;
  }
}
</style>
