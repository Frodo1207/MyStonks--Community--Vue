<template>
  <div class="achievement-badge" :class="{ unlocked: unlocked }">
    <div class="badge-icon">
      <slot name="icon">
        <svg v-if="achievement.icon === 'rookie'" viewBox="0 0 24 24" width="40" height="40">
          <path fill="currentColor" d="M12 3L2 12h3v8h14v-8h3L12 3zm0 5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 5.5h-1v4H9v-4H8v4H7v-5.16l5-4.5 5 4.5V19h-1v-4z"/>
        </svg>
        <svg v-else-if="achievement.icon === 'active'" viewBox="0 0 24 24" width="40" height="40">
          <path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <svg v-else-if="achievement.icon === 'governance'" viewBox="0 0 24 24" width="40" height="40">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        <svg v-else-if="achievement.icon === 'ambassador'" viewBox="0 0 24 24" width="40" height="40">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="40" height="40">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
        </svg>
      </slot>
    </div>

    <div class="badge-info">
      <h3>{{ achievement.name }}</h3>
      <p>{{ achievement.description }}</p>
    </div>

    <div v-if="!unlocked" class="locked-overlay">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  achievement: {
    type: Object,
    required: true
  },
  unlocked: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.achievement-badge {
  background: rgba(30, 30, 46, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  transition: all 0.3s;
  border: 1px solid rgba(138, 43, 226, 0.3);
  backdrop-filter: blur(12px);
}

.achievement-badge.unlocked {
  border-color: var(--primary-light);
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
}

.achievement-badge.unlocked:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(138, 43, 226, 0.4);
}

.badge-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-badge.unlocked .badge-icon {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
}

.badge-icon svg {
  color: var(--primary-light);
  width: 40px;
  height: 40px;
}

.achievement-badge.unlocked .badge-icon svg {
  color: white;
}

.badge-info {
  text-align: center;
}

.badge-info h3 {
  margin: 0 0 0.3rem;
  font-size: 1rem;
  color: white;
}

.achievement-badge.unlocked .badge-info h3 {
  color: var(--primary-light);
}

.badge-info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.4;
}

.locked-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 30, 46, 0.7);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.locked-overlay svg {
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .achievement-badge {
    padding: 1rem;
  }

  .badge-icon {
    width: 60px;
    height: 60px;
  }

  .badge-icon svg {
    width: 30px;
    height: 30px;
  }

  .badge-info h3 {
    font-size: 0.9rem;
  }

  .badge-info p {
    font-size: 0.8rem;
  }
}
</style>
