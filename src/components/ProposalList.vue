<!-- components/ProposalList.vue -->
<template>
  <div class="proposal-list">
    <div class="filter-bar">
      <button
          v-for="filter in filters"
          :key="filter.value"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
          @click="activeFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="grid">
      <div
          v-for="proposal in filteredProposals"
          :key="proposal.id"
          class="proposal-card"
          @click="selectProposal(proposal)"
      >
        <div class="card-header">
          <span class="status-badge" :class="proposal.status">{{ proposal.status }}</span>
          <span class="end-time">截止: {{ formatDate(proposal.endTime) }}</span>
        </div>
        <h3 class="title">{{ proposal.title }}</h3>
        <div class="voting-progress">
          <div class="progress-bar">
            <div
                class="progress-fill"
                :style="{ width: `${(proposal.currentVotes / proposal.quorum) * 100}%` }"
            ></div>
          </div>
          <div class="progress-info">
            <span>{{ proposal.currentVotes }} / {{ proposal.quorum }} 票</span>
            <span>{{ Math.round((proposal.currentVotes / proposal.quorum) * 100) }}%</span>
          </div>
        </div>
        <div class="glow-effect"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'

const props = defineProps({
  proposals: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select'])

const activeFilter = ref('all')
const filters = [
  { label: '全部提案', value: 'all' },
  { label: '进行中', value: 'active' },
  { label: '已通过', value: 'passed' },
  { label: '未通过', value: 'rejected' }
]

const filteredProposals = computed(() => {
  if (activeFilter.value === 'all') return props.proposals
  return props.proposals.filter(p => p.status === activeFilter.value)
})

const formatDate = (timestamp) => {
  return format(new Date(timestamp), 'yyyy/MM/dd HH:mm')
}

const selectProposal = (proposal) => {
  emit('select', proposal)
}
</script>

<style scoped>
.proposal-list {
  display: grid;
  gap: 2rem;
}

.filter-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.proposal-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.proposal-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-badge {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
}

.status-badge.active {
  background: rgba(33, 150, 243, 0.2);
  color: #2196F3;
}

.status-badge.passed {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.status-badge.rejected {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.end-time {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.title {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.voting-progress {
  margin-top: auto;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.5s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.glow-effect {
  /* 复用活动卡片流光效果 */
}
</style>
