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
      '59d9-2408-8266-3-86b-f5de-b43c-146-2a34.ngrok-free.app' // 允许特定域名
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
