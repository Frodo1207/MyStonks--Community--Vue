import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 确保路径正确
import { createPinia } from 'pinia'
import SolanaWallets from 'solana-wallets-vue'
import 'solana-wallets-vue/styles.css';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    // 如需支持其他钱包，请在此处添加相应的适配器
} from '@solana/wallet-adapter-wallets';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        // 添加其他钱包适配器实例
    ],
    autoConnect: true
}



// 创建 Pinia 实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);



createApp(App).use(router).use(pinia).use(SolanaWallets, walletOptions).mount('#app')
