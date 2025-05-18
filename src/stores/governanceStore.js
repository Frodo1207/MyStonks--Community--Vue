// stores/governanceStore.js
import { defineStore } from 'pinia'

export const useGovernanceStore = defineStore('governance', {
    state: () => ({
        proposals: [
            {
                id: 1,
                title: 'DAO 治理结构优化提案',
                description: '建议优化当前DAO治理结构...',
                status: 'active',
                currentVotes: 1200,
                quorum: 2000,
                endTime: 1704067200000, // 2024-01-01
                timestamp: 1698768000000 // 2023-10-31
            },
            {
                id: 2,
                title: '社区基金使用方案',
                description: '关于社区基金分配的提案...',
                status: 'passed',
                currentVotes: 1800,
                quorum: 1500,
                endTime: 1701388800000,
                timestamp: 1696099200000
            }
        ]
    }),
    getters: {
        getProposalById: (state) => (id) => {
            return state.proposals.find(p => p.id === id)
        }
    }
})
