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
    }
})
