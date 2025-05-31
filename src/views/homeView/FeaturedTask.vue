<template>
  <h2 class="title">精选任务</h2>
  <div class="featured-task-horizontal">
    <div class="task-content">
      <div class="task-main">
        <div class="task-info">
          <div class="task-header">
            <div class="task-icon">
              <slot name="icon">
                <!-- 默认图标 -->
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.5,8L11,13.5L7.5,10L6,11.5L11,16.5Z" />
                </svg>
              </slot>
            </div>
            <h3 class="task-title">{{ title }}</h3>
          </div>
          <p class="task-description">{{ description }}</p>
        </div>
        <div class="task-progress" v-if="showProgress">
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ progress }}% 完成</span>
          </div>
        </div>
        <div class="task-reward" v-if="showReward">
          <span class="reward-amount">{{ rewardAmount }}</span>
          <span class="reward-unit">{{ rewardUnit }}</span>
          <span class="reward-bonus" v-if="bonusAmount">+{{ bonusAmount }} 额外奖励</span>
        </div>
      </div>
      <button class="task-action" @click="$emit('action')">
        {{ authrityText }}
        <svg viewBox="0 0 24 24" width="16" height="16" class="arrow-icon">
          <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
        </svg>
      </button>
      <div id="telegram-login-button"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  badgeText: {
    type: String,
    default: '精选任务'
  },
  title: {
    type: String,
    default: '进入tg社群'
  },
  description: {
    type: String,
    default: '进入tg社区，绑定钱包，领取奖励'
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  progress: {
    type: Number,
    default: 30,
    validator: value => value >= 0 && value <= 100
  },
  showReward: {
    type: Boolean,
    default: true
  },
  rewardAmount: {
    type: [Number, String],
    default: 200
  },
  rewardUnit: {
    type: String,
    default: '积分'
  },
  bonusAmount: {
    type: [Number, String],
    default: '50'
  },
  authrityText: {
    type: String,
    default: '立即验证'
  }
});

defineEmits(['action']);
</script>

<style scoped>
.featured-task-horizontal {
  width: calc(100% - 40px);
  max-width: 1200px;
  background: linear-gradient(135deg, rgba(30, 30, 46, 0.8), rgba(44, 24, 62, 0.8));
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(138, 43, 226, 0.3);
  box-shadow: 0 8px 24px rgba(138, 43, 226, 0.2);
  margin: 1.5rem auto;
  position: relative;
  overflow: hidden;
}

.featured-task-horizontal::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, rgba(138, 43, 226, 0) 70%);
  z-index: -1;
}

.task-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
}

.task-badge {
  position: absolute;
  top: 0;
  right: 1.5rem;
  background: var(--primary-light);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 0 0 8px 8px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(148, 0, 211, 0.5);
}

.task-main {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
  width: 100%;
}

.task-info {
  flex: 1;
  min-width: 200px;
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.task-icon {
  width: 36px;
  height: 36px;
  background: rgba(138, 43, 226, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
}

.task-icon svg {
  color: var(--primary-light);
}
.title {
  padding-left: 20px;
}
.task-title {
  font-size: 1.2rem;
  color: white;
  margin: 0;
}

.task-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0;
}

.task-progress {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
}

.progress-container {
  display: flex;
  flex-direction: column;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-bottom: 0.3rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
}

.task-reward {
  display: flex;
  align-items: center;
  min-width: 150px;
}

.reward-amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-light);
  margin-right: 0.3rem;
}

.reward-unit {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-right: 0.8rem;
}

.reward-bonus {
  background: rgba(255, 215, 0, 0.2);
  color: gold;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
}

.task-action {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  white-space: nowrap;
}

.task-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
}

.arrow-icon {
  margin-left: 0.5rem;
  transition: transform 0.3s;
}

.task-action:hover .arrow-icon {
  transform: translateX(3px);
}

@media (max-width: 992px) {
  .featured-task-horizontal {
    width: calc(100% - 40px);
  }

  .task-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .task-main {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  }

  .task-info, .task-progress {
    width: 100%;
    max-width: 100%;
  }

  .task-action {
    width: 100%;
  }

  .task-badge {
    right: 50%;
    transform: translateX(50%);
    border-radius: 0 0 8px 8px;
  }
}

@media (max-width: 576px) {
  .featured-task-horizontal {
    padding: 1.2rem;
    width: calc(100% - 24px);
  }

  .task-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-icon {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
