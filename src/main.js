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
} from '@solana/wallet-adapter-wallets'


const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        // 添加其他钱包适配器实例
    ],
    autoConnect: true
}



const pinia = createPinia()



createApp(App).use(router).use(pinia).use(SolanaWallets, walletOptions).mount('#app')
