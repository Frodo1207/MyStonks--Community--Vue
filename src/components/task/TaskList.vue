<!-- components/TaskList.vue -->
<template>
  <div class="task-list">
    <div class="header">
      <h2 v-if="title" class="section-title">{{ title }}</h2>
      <div class="filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div class="grid">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @click="selectTask(task)"
      />
    </div>

    <!-- 任务详情弹窗 -->
    <TaskDetail
      v-if="selectedTask"
      :task="selectedTask"
      @close="selectedTask = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskCard from './TaskCard.vue'
import TaskDetail from './TaskDetail.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select'])

const activeFilter = ref('all')
const selectedTask = ref(null)

const filters = [
  { label: '全部任务', value: 'all' },
  { label: '待处理', value: 'todo' },
  { label: '进行中', value: 'in-progress' },
  { label: '已完成', value: 'completed' }
]

const filteredTasks = computed(() => {
  if (activeFilter.value === 'all') return props.tasks
  return props.tasks.filter(task => task.status === activeFilter.value)
})

const selectTask = (task) => {
  selectedTask.value = task
  emit('select', task)
}
</script>

<style scoped>
.task-list {
  display: grid;
  gap: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  color: white;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active {
  background: var(--primary-color);
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filters {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .filter-btn {
    white-space: nowrap;
  }
}
</style> 