<template>
  <div class="task-center-page">
    <!-- Loading 弹窗 -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>处理中，请稍候...</p>
      </div>
    </div>
    <!-- 顶部横幅 -->
    <div class="task-banner">
      <div class="banner-content">
        <h1>任务中心</h1>
        <p>完成任务获取积分，解锁社区特权</p>
        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-value">{{ completedTasks }}</span>
            <span class="stat-label">已完成</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalPoints }}</span>
            <span class="stat-label">总积分</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ currentLevel }}</span>
            <span class="stat-label">当前排名</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新手任务 -->
    <NewbieTaskList
        v-if="!allNewbieTasksCompleted"
        :tasks="newbieTasks"
        @action="handleTaskAction"
    />
    <!-- 日常任务 -->
    <div class="section-title">
      <h2>日常任务</h2>
      <div class="refresh-info">
        <span>每日0点刷新</span>
        <span class="refresh-time">剩余 {{ refreshTime }}</span>
      </div>
    </div>

    <div class="daily-tasks-grid">
      <TaskCard
          v-for="task in dailyTasks"
          :key="task.id"
          :task="task"
          @action="handleTaskAction(task)"
      />
    </div>

    <!-- 其他任务 -->
    <OtherTasksGrid
        :tasks="otherTasks"
        @action="handleTaskAction"
    />

    <!-- 排行榜 -->
    <div class="section-title">
      <h2>积分排行榜</h2>
      <span class="refresh-time">实时更新</span>
    </div>

    <div class="leaderboard">
      <div class="leaderboard-header">
        <span>排名</span>
        <span>钱包地址</span>
        <span>积分</span>
      </div>

      <div
          v-for="(user, index) in leaderboard"
          :key="user.id"
          class="leaderboard-item"
          :class="{ 'current-user': user.isCurrentUser }"
      >
        <span class="rank" :class="getRankClass(index + 1)">
          {{ index + 1 }}
        </span>
        <div class="user-info">
          <span class="address">{{ formatAddress(user.address) }}</span>
          <span v-if="user.isCurrentUser" class="you-tag">你</span>
        </div>
        <span class="points">{{ user.points.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import TaskCard from '@/components/TaskCard.vue'
import NewbieTaskList from '@/components/NewbieTaskList.vue'
import OtherTasksGrid from '@/components/OtherTasksGrid.vue'
import {
  getDailyTasks,
  getNewbieTasks,
  getOtherTasks,
  getUserTasksInfo,
  checkTaskIsComplete,
  getStonksTradeRes,
} from "@/services/tasks.js"

const loading = ref(false)

// 用户数据
const completedTasks = ref(0)
const totalPoints = ref(0)
const currentLevel = ref(0)
const currentUserId = ref(null)
const currentUserName = ref('')

// 排行榜数据
const leaderboard = ref([])

// 任务数据
const newbieTasks = ref([])
const dailyTasks = ref([])
const otherTasks = ref([])

// 倒计时显示
const refreshTime = ref('00:00:00')

function updateCountdown() {
  const now = new Date()
  const tomorrow = new Date()
  tomorrow.setHours(24, 0, 0, 0) // 设置为明天0点
  const diff = tomorrow - now

  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0')
  const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0')

  refreshTime.value = `${hours}:${minutes}:${seconds}`
}
// 方法：格式化钱包地址
const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`

// 方法：获取排行榜样式
const getRankClass = (rank) => {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return ''
}

const allNewbieTasksCompleted = computed(() => {
  return newbieTasks.value.length > 0 && newbieTasks.value.every(task => task.completed)
})
watch(loading, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
const handleTaskAction = async (task) => {
  // 处理特殊动作任务
  console.log(task)
  if (task.special_action === 'login_popup') {
    alert('请先登录钱包以完成该任务')
    return
  }

  if (task.special_action === 'tg_bind_popup') {
    alert('请先绑定TG账户以完成该任务')
    return
  }

  if (task.special_action === 'stonks_trade') {
    loading.value = true; // 开始显示loading弹框

    try {
      console.log('开始执行stonks_trade操作');
      let res = await getStonksTradeRes("9DqeqSpLV5CX2rp7hr5SMgbdwtj2qFaw96s6aJsCnjmq");
      console.log('操作结果:', res);
      if (res.data.is_trade) {
        console.log("gooooooood")
        alert('goood');
      }
      else {
        console.log("bad")
        alert('bad');
      }
      return
    } catch (error) {
      console.error('验证失败', error);
      // 可以在这里添加错误提示
      // showToast('验证失败: ' + error.message, 'error');
      return
    } finally {
      // 添加一点延迟让用户看到状态变化
      setTimeout(() => {
        loading.value = false;
      }, 300);
    }
    return;
  }
  // 阻止日常和其他任务的点击，若新手任务未完成
  const isRestrictedTask = dailyTasks.value.concat(otherTasks.value).some(t => t.id === task.id)
  if (!allNewbieTasksCompleted.value && isRestrictedTask) {
    alert('请先完成所有新手任务，再进行后续任务～')
    return
  }

  // 正常校验任务是否已完成
  try {
    const res = await checkTaskIsComplete(currentUserId.value, task.id)
    const { completed } = res.data || {}
    if (completed) {
      markTaskComplete(task.id)
    } else {
      alert('任务尚未完成，请按照要求完成任务后再返回点击。')
    }
  } catch (err) {
    console.error('任务完成校验失败:', err)
    alert('检查任务失败，请稍后再试')
  }
}

const markTaskComplete = (taskId) => {
  const update = (list) => {
    const task = list.find(t => t.id === taskId)
    if (task && !task.completed) {
      task.completed = true
      totalPoints.value += task.reward
      completedTasks.value += 1
    }
  }

  update(newbieTasks.value)
  update(dailyTasks.value)
  update(otherTasks.value)
}

// 数据加载
onMounted(async () => {
  // 模拟倒计时
  setInterval(() => {
    updateCountdown()
  }, 1000)

  try {
    const [userResp, dailyTaskResp, newbieTaskResp, otherTasksResp] = await Promise.all([
      getUserTasksInfo(),
      getDailyTasks(),
      getNewbieTasks(),
      getOtherTasks()
    ])

    const userData = userResp?.data?.data || {}
    completedTasks.value = userData.tasks?.length || 0
    totalPoints.value = userData.point || 0
    currentLevel.value = userData.rank || 0
    currentUserId.value = userData.user_id
    currentUserName.value = userData.user_name

    if (dailyTaskResp?.data?.data) dailyTasks.value = dailyTaskResp.data.data
    if (newbieTaskResp?.data?.data) newbieTasks.value = newbieTaskResp.data.data
    if (otherTasksResp?.data?.data) otherTasks.value = otherTasksResp.data.data

    leaderboard.value = [
      { id: 1, address: '0x3f5C...', points: 12500, isCurrentUser: false },
      { id: 2, address: '0xDec8...', points: 9800, isCurrentUser: false },
      { id: 9, address: '0x4B59...', points: userData.point, isCurrentUser: true }
    ]

  } catch (error) {
    console.error("初始化任务中心失败:", error)
  }
})
</script>
<style scoped>
.task-center-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: white;
}

/* 顶部横幅 */
.task-banner {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(75, 0, 130, 0.8));
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.task-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  z-index: -1;
}

.banner-content h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.banner-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.user-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(45deg, #fff, var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 任务区 */
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1.5rem;
}

.section-title h2 {
  font-size: 1.5rem;
  margin-top: 20px;
}

.refresh-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.refresh-time {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
}

/* 日常任务网格 */
.daily-tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.leaderboard {
  background: rgba(30, 30, 46, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(138, 43, 226, 0.3);
  margin-top: 2rem;
}

.leaderboard-header {
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.leaderboard-item {
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s;
}

.leaderboard-item:hover {
  background: rgba(138, 43, 226, 0.1);
}

.leaderboard-item.current-user {
  background: rgba(138, 43, 226, 0.2);
  border: 1px solid var(--primary-light);
}

.rank {
  font-weight: bold;
  padding-left: 1rem;
}

.rank.gold {
  color: gold;
}

.rank.silver {
  color: silver;
}

.rank.bronze {
  color: #cd7f32;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.address {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
}

.you-tag {
  background: var(--primary-light);
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.points {
  text-align: right;
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
  padding-right: 1rem;
}

@media (max-width: 768px) {
  .leaderboard-header,
  .leaderboard-item {
    grid-template-columns: 50px 1fr 90px;
    padding: 0.8rem;
  }

  .address {
    font-size: 0.8rem;
  }

  .points {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .leaderboard-header,
  .leaderboard-item {
    grid-template-columns: 40px 1fr 70px;
  }

  .address {
    font-size: 0.7rem;
  }

  .rank {
    padding-left: 0.5rem;
  }

  .points {
    padding-right: 0.5rem;
  }
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  text-align: center;
  color: white;
  font-size: 1rem;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--primary-light, #8a2be2); /* fallback 紫色 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
