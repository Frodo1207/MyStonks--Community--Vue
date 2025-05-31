import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfo', {
    state: () => ({
        userInfo: {
            username: 'John Doe',
            telegram:  undefined,
        },
    }),
    getters: {
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        setUserInfo(userInfo) {
            this.walletAddress = userInfo.walletAddress
            this.token = userInfo.token
            this.isAuthenticated = true
        },
        logout() {
            this.$reset() // ✅ 使用 Pinia 内置 reset 方法
        }
    },
    persist: true // ✅ 启用持久化
})
