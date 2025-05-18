<!-- components/ProposalDetail.vue -->
<template>
  <div class="proposal-detail">
    <div class="modal-overlay" @click.self="$emit('close')"></div>

    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>

      <div class="content-header">
        <h2 class="title">{{ proposal.title }}</h2>
        <div class="meta-info">
          <span class="status-badge" :class="proposal.status">{{ proposal.status }}</span>
          <span class="proposal-id">#{{ proposal.id }}</span>
        </div>
      </div>

      <div class="content-body">
        <div class="description-section">
          <h3>提案描述</h3>
          <p class="description">{{ proposal.description }}</p>
        </div>

        <div class="voting-section">
          <h3>投票进展</h3>
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

          <div class="voting-options">
            <button
                v-for="option in votingOptions"
                :key="option.value"
                :class="['vote-btn', { selected: selectedVote === option.value }]"
                @click="selectedVote = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <button class="submit-btn" @click="submitVote">
            {{ hasVoted ? '更新投票' : '提交投票' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  proposal: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const selectedVote = ref(null)
const hasVoted = ref(false)

const votingOptions = [
  { label: '赞成', value: 'for' },
  { label: '反对', value: 'against' },
  { label: '弃权', value: 'abstain' }
]

const submitVote = () => {
  // 投票逻辑
  hasVoted.value = true
}
</script>

<style scoped>
.proposal-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  background: rgba(30, 30, 46, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.content-header {
  margin-bottom: 2rem;
}

.title {
  color: var(--primary-light);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.proposal-id {
  color: rgba(255, 255, 255, 0.6);
}

.description-section {
  margin-bottom: 2rem;
}

.description {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.voting-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.vote-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.vote-btn.selected {
  background: var(--primary-color);
  color: white;
}

.submit-btn {
  width: 100%;
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: var(--primary-dark);
}
</style>
