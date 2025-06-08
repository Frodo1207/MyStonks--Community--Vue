import { createApp } from 'vue';

import { createPinia } from 'pinia';
import SolanaWallets from 'solana-wallets-vue';
import 'solana-wallets-vue/styles.css';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    // SlopeWalletAdapter,
    SolongWalletAdapter,
    MathWalletAdapter,
    SafePalWalletAdapter,
    TokenPocketWalletAdapter,
    Coin98WalletAdapter,
    NightlyWalletAdapter,
    // ZelcoreWalletAdapter,
    XDEFIWalletAdapter,
    NufiWalletAdapter,
    HyperPayWalletAdapter,
    // 如需支持其他钱包，请在此处添加相应的适配器
} from '@solana/wallet-adapter-wallets';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// 需单独安装的钱包
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger';
import { BitKeepWalletAdapter } from '@solana/wallet-adapter-bitkeep';
import { TrustWalletAdapter } from '@solana/wallet-adapter-trust';
import { WalletConnectWalletAdapter } from '@solana/wallet-adapter-walletconnect';

import { i18n } from './i18n';
import router from './router';
import App from './App.vue';

import './style.css';

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        // new SlopeWalletAdapter(),
        new SolongWalletAdapter(),
        new BitKeepWalletAdapter(),
        new MathWalletAdapter(),
        new TrustWalletAdapter(),
        new SafePalWalletAdapter(),
        new TokenPocketWalletAdapter(),
        new Coin98WalletAdapter(),
        new NightlyWalletAdapter(),
        new BackpackWalletAdapter(),
        //  new GlowWalletAdapter(),
        //  new ZelcoreWalletAdapter(),
        new XDEFIWalletAdapter(),
        new NufiWalletAdapter(),
        new HyperPayWalletAdapter(),
        //  new NovaWalletAdapter(),
        //   new RWalletAdapter(),
        new WalletConnectWalletAdapter({ network: ' solana',
            options: {
                projectId: 'YOUR_PROJECT_ID' // 替换为实际 Project ID
            }}), // 支持 WalletConnect
        // 添加其他钱包适配器实例
    ],
    autoConnect: true,
};

// 创建 Pinia 实例
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).use(SolanaWallets, walletOptions).use(i18n).mount('#app');
