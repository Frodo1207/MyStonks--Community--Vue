<template>
  <div class="task-card" :class="{ completed: task.completed }">
    <div class="task-icon">
      <slot name="icon">
        <svg v-if="task.icon === 'check-circle'" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <svg v-else-if="task.icon === 'message-square'" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
        <svg v-else-if="task.icon === 'book-open'" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25-.25.5-.5.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
        </svg>
      </slot>
    </div>

    <div class="task-content">
      <div class="task-info">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>

      <div class="task-reward">
        <span class="reward-amount">+{{ task.reward }}</span>
        <span class="reward-unit">积分</span>
      </div>
    </div>

    <button
        class="task-action"
        @click="$emit('action', task)"
        :disabled="task.completed"
    >
      {{ task.completed ? '已完成' : '去完成' }}
    </button>

    <div v-if="task.completed" class="task-completed-badge">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['action'])
</script>

<style scoped>
.task-card {
  background: rgba(30, 30, 46, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(138, 43, 226, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;
  transition: all 0.3s;
  backdrop-filter: blur(12px);
}

.task-card:hover {
  border-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(138, 43, 226, 0.2);
}

.task-card.completed {
  opacity: 0.7;
  border-color: rgba(76, 175, 80, 0.3);
}

.task-card.completed:hover {
  border-color: rgba(76, 175, 80, 0.5);
}

.task-icon {
  width: 48px;
  height: 48px;
  background: rgba(138, 43, 226, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-icon svg {
  color: var(--primary-light);
  width: 24px;
  height: 24px;
}

.task-content {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.task-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: white;
}

.task-info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
}

.task-reward {
  display: flex;
  align-items: center;
  min-width: max-content;
}

.reward-amount {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--primary-light);
  margin-right: 0.3rem;
}

.reward-unit {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.task-action {
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.task-action:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
}

.task-action:disabled {
  background: rgba(76, 175, 80, 0.2);
  color: rgba(76, 175, 80, 0.8);
  cursor: not-allowed;
}

.task-completed-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #4CAF50;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(76, 175, 80, 0.5);
}

.task-completed-badge svg {
  color: white;
}

@media (max-width: 768px) {
  .task-card {
    padding: 1.2rem;
  }

  .task-icon {
    width: 40px;
    height: 40px;
  }

  .task-icon svg {
    width: 20px;
    height: 20px;
  }

  .reward-amount {
    font-size: 1.1rem;
  }
}
</style>
