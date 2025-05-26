<!-- views/TaskView.vue -->
<template>
  <div class="task-view">
    <div class="header-section">
      <h1 class="page-title">任务管理</h1>
      <p class="page-description">管理您的任务和待办事项</p>
    </div>

    <div class="task-container">
      <TaskList :tasks="tasks" title="我的任务" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskList from '@/components/task/TaskList.vue'

// 模拟任务数据
const tasks = ref([
  {
    id: 1,
    title: '完成推特点赞',
    description: 'MyStonks-官推点赞',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-25',
    assignee: '张三',
    progress: 60,
    createdAt: '2024-03-15',
    comments: [
      {
        id: 1,
        author: '李四',
        content: '已完成',
        time: '2024-03-16'
      }
    ]
  },
  {
    id: 2,
    title: '币币交易',
    description: '提交币币哈希',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-03-22',
    assignee: '王五',
    progress: 0,
    createdAt: '2024-03-17'
  },
  {
    id: 3,
    title: '美股交易',
    description: '美股哈希',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-03-20',
    assignee: '赵六',
    progress: 100,
    createdAt: '2024-03-14',
    comments: [
      {
        id: 1,
        author: '张三',
        content: '已提交完成✅',
        time: '2024-03-19'
      }
    ]
  }
])
</script>

<style scoped>
.task-view {
  max-width: var(--container-width);
  margin: 2rem auto;
  padding: 0 1rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  color: var(--primary-light);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.page-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

.task-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}

@media (max-width: 768px) {
  .task-view {
    margin: 1rem auto;
  }

  .page-title {
    font-size: 2rem;
  }

  .task-container {
    padding: 1rem;
  }
}
</style> 