<template>
  <div class="task-center-page">
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
            <span class="stat-label">当前等级</span>
          </div>
        </div>
      </div>
    </div>

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
import { ref, onMounted } from 'vue'
import TaskCard from '@/components/TaskCard.vue'

// 用户数据
const completedTasks = ref(12)
const totalPoints = ref(4500)
const currentLevel = ref(3)

// 日常任务数据
const dailyTasks = ref([
  {
    id: 101,
    title: '每日签到',
    description: '访问社区网站并签到',
    reward: 50,
    completed: true,
    icon: 'check-circle'
  },
  {
    id: 102,
    title: '社区互动',
    description: '在论坛发表1条评论',
    reward: 100,
    completed: false,
    icon: 'message-square'
  },
  {
    id: 103,
    title: '学习Web3',
    description: '完成一篇教程学习',
    reward: 150,
    completed: false,
    icon: 'book-open'
  }
])

// 排行榜数据（使用钱包地址）
const leaderboard = ref([
  {
    id: 1,
    address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
    points: 12500,
    isCurrentUser: false
  },
  {
    id: 2,
    address: '0xDec803B6b6b57E4E9E789F4C692210e284220904',
    points: 9800,
    isCurrentUser: false
  },
  {
    id: 3,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    points: 8760,
    isCurrentUser: false
  },
  {
    id: 9,
    address: '0x4B5922ABf25858d012da12C879BecC631AC6e7b1',
    points: 2100,
    isCurrentUser: true
  },
])
// 格式化地址显示
const formatAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
// 刷新时间
const refreshTime = ref('12:34:56')

// 方法
const handleTaskAction = (task) => {
  console.log('处理任务:', task.title)
  markTaskComplete(task.id)
}

const markTaskComplete = (taskId) => {
  const task = dailyTasks.value.find(t => t.id === taskId)
  if (task) {
    task.completed = true
    totalPoints.value += task.reward
    completedTasks.value += 1
  }
}

const getRankClass = (rank) => {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return ''
}

// 模拟倒计时
onMounted(() => {
  setInterval(() => {
    // 这里应该计算真实的时间差
    // 简化版仅用于演示
    refreshTime.value = '11:23:45'
  }, 1000)
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
</style>
