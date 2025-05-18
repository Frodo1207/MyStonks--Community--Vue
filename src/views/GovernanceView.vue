<!-- views/GovernanceView.vue -->
<template>
  <div class="governance-view">
    <div class="header-section">
      <h1 class="page-title">社区治理</h1>
      <p class="page-description">参与社区决策，共建MyStonks未来</p>
    </div>

    <div class="governance-container">
      <!-- 提案列表 -->
      <ProposalList :proposals="sortedProposals" />

      <!-- 提案详情弹窗 -->
      <ProposalDetail
          v-if="selectedProposal"
          :proposal="selectedProposal"
          @close="selectedProposal = null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGovernanceStore } from '@/stores/governanceStore'
import ProposalList from '@/components/ProposalList.vue'
import ProposalDetail from '@/components/ProposalDetail.vue'

const governanceStore = useGovernanceStore()
const selectedProposal = ref(null)

const sortedProposals = computed(() => {
  return [...governanceStore.proposals].sort((a, b) => b.timestamp - a.timestamp)
})
</script>

<style scoped>
.governance-view {
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

.governance-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}
</style>
