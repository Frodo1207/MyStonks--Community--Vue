import { createApp } from 'vue';

import { createPinia } from 'pinia';
import SolanaWallets from 'solana-wallets-vue';
import 'solana-wallets-vue/styles.css';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    // 如需支持其他钱包，请在此处添加相应的适配器
} from '@solana/wallet-adapter-wallets';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { i18n } from './i18n';
import router from './router';
import App from './App.vue';

import './style.css';

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        // 添加其他钱包适配器实例
    ],
    autoConnect: true,
};

// 创建 Pinia 实例
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).use(SolanaWallets, walletOptions).use(i18n).mount('#app');
