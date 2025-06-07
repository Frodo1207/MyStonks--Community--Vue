import { defineStore } from 'pinia';

export const useI18nStore = defineStore('i18n', {
    state: () => ({
        langsOption: [
            {
                id: 0,
                key: 'zh',
                title: '简体中文',
            },
            {
                id: 1,
                key: 'en',
                title: 'English',
            },
        ],
        lang: null,
    }),
    actions: {
        setI18nLang(lang) {
            this.lang = lang;
            localStorage.setItem('i18nLang', lang);
        },
    },
    persist: true,
});
