import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
    state: () => ({
        activities: []
    }),
    getters: {
        getActivityById: (state) => (id) => {
            // 统一将ID转为字符串比较
            return state.activities.find(activity => String(activity.id) === String(id))
        },
        sortedActivities: (state) => {
            return [...state.activities].sort((a, b) => b.heat - a.heat)
        }
    }
})
