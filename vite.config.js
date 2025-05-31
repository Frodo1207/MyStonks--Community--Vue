import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  server: {
    // 允许的主机列表
    allowedHosts: [
      '7ddf-2408-8266-3-3e33-2106-62f0-1172-58b5.ngrok-free.app' // 允许特定域名
    ],
    proxy: {
      '/api': {
        target: 'http://47.121.120.73:8000/', // 你的 API 地址
        changeOrigin: true,                    // 支持虚拟主机
        secure: false,                         // 不验证 SSL 证书（HTTP 时可省略）

      }
    }
  },

})
