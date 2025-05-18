import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
    state: () => ({
        activities: [
            {
                id: 1,
                title: 'Web3 开发者大会',
                cover: 'https://telegram.org/file/400780400126/2/MBOZkN2pAaA.257969.jpg/c731520c8caf48c2a5',
                heat: 1250,
                description: '年度最大的 Web3 开发者盛会...',
                startTime: '2023-11-15',
                endTime: '2023-11-17',
                location: '线上',
                organizer: 'Web3 Foundation'
            },
            {
                id: 2,
                title: '区块链技术研讨会',
                cover: 'https://telegram.org/file/400780400126/2/MBOZkN2pAaA.257969.jpg/c731520c8caf48c2a5',
                heat: 950,
                description: '深入探讨区块链技术的最新发展...',
                startTime: '2023-12-01',
                endTime: '2023-12-02',
                location: '北京',
                organizer: '区块链协会'
            },
            {
                id: 3,
                title: '去中心化金融峰会',
                cover: 'https://telegram.org/file/400780400126/2/MBOZkN2pAaA.257969.jpg/c731520c8caf48c2a5',
                heat: 800,
                description: '聚焦去中心化金融的未来...',
                startTime: '2024-01-10',
                endTime: '2024-01-12',
                location: '上海',
                organizer: 'DeFi 联盟'
            },
            // 更多活动...
        ]
    }),
    getters: {
        getActivityById: (state) => (id) => {
            return state.activities.find(activity => activity.id === Number(id))
        },
        sortedActivities: (state) => {
            return [...state.activities].sort((a, b) => b.heat - a.heat)
        }
    }
})
