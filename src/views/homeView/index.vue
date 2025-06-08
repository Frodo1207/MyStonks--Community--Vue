<template>

  <!-- 新版欢迎Banner -->
  <Banner/>

  <FeaturedTask
      title="加入tg社区"
      description="加入tg社区并绑定钱包，领取奖励"
      :progress="30"
      :rewardAmount="200"
      rewardUnit="积分"
      bonusAmount="50"
      :authrityText="loginUserInfo?.telegram ?'立即验证':'绑定账号'"
      @action="loginUserInfo?.telegram ? handleTaskAction():bindTelegram()"
  />

  <div class="home-view">
    <ActivityList
        title="热门活动"
        :activities="sortedActivities"
    />
  </div>

</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useActivityStore } from '@/stores/activityStore'
  import {userInfoStore} from "@/stores/userinfo";
  import ActivityList from '@/components/ActivityList.vue'
  import { onMounted } from 'vue'
  import Banner from '@/components/Banner.vue';
  import FeaturedTask from './FeaturedTask.vue';

  const activityStore = useActivityStore()
  const { sortedActivities } = storeToRefs(activityStore)
  const loginUserInfoStore = userInfoStore()
  const loginUserInfo  = loginUserInfoStore.getUserInfo

  // 打印检查数据
 // console.log('Initial sortedActivities:', sortedActivities.value)


  const handleTaskAction = () => {
    // 这里可以添加处理逻辑，比如跳转页面或打开弹窗
  };






  const bindTelegram = () => {
    console.log('绑定账号被点击',11111);
    // 将回调函数挂载到 window
    window.onTelegramAuth = onTelegramAuth
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?7'
    script.async = true
    script.setAttribute('data-telegram-login', 'myStonks_mawen_bot') // ⚠️ 替换成你的 Bot 用户名（不带 @）
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-radius', '8')
    script.setAttribute('data-lang', 'zh')
    script.setAttribute('data-onauth', 'onTelegramAuth(user)')
    script.setAttribute('data-request-access', 'write')

    const container = document.getElementById('telegram-login-button')
    if (container) {
      debugger
      container.innerHTML = '' // 清空旧的（防止重复插入）
      container.appendChild(script)
    }

  }

  onMounted(() => {
    window.onTelegramAuth = onTelegramAuth
  // 组件挂载后再次打印，确保数据已加载
  //console.log('sortedActivities after mount:', sortedActivities.value)

  // 如果需要，可以在这里调用action来加载数据
  // activityStore.fetchActivities()
})

  // 如果数据是异步加载的，可以添加一个watcher
  // import { watch } from 'vue'
  // watch(sortedActivities, (newVal) => {
//   console.log('sortedActivities changed:', newVal)
// }, { deep: true })

</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}
/* 长条形精选任务卡片样式 */
.featured-task-horizontal {
  width: calc(100% - 40px); /* 减去两侧padding */
  max-width: 1200px;
  background: linear-gradient(135deg, rgba(30, 30, 46, 0.8), rgba(44, 24, 62, 0.8));
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(138, 43, 226, 0.3);
  box-shadow: 0 8px 24px rgba(138, 43, 226, 0.2);
  margin: 2rem auto; /* 改为auto实现水平居中 */
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

/* 响应式调整 */
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
    width: calc(100% - 24px); /* 更小的屏幕减小宽度 */
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

/* 确保整体布局一致 */
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  width: calc(100% - 40px); /* 与任务卡片保持一致 */
}
</style>
