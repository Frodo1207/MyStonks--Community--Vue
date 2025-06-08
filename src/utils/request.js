// src/utils/request.js
import axios from 'axios';
import { walletLoginRefresh} from '@/services/user.js'

// 创建实例
const service = axios.create({
    baseURL: 'http://localhost:8000/', // ✅ 使用代理路径
    timeout: 30000,
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 加 token
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // 其他自定义 header 可以在这里加
        return config;
    },
    (error) => {
        return {...error,status:'error',};
    }
);

// 响应拦截器
service.interceptors.response.use(
    async (response) => {
        const res = response.data;
        if (res.code !== 0) {
            if(res.code===10002){
              const refresh_token = sessionStorage.getItem('refresh_token')
            if(refresh_token){
                const res = await walletLoginRefresh({refresh_token})
                // auth校验失败，刷新令牌
                if(res.code===10002){
                    // 存储用户信息到 Pinia Store
                    userStore.setUserInfo({
                        walletAddress: address,
                        isAuthenticated: false,
                        access_token: response.access_token,
                        refresh_token:response.refresh_token,
                        login:true
                    })
                    sessionStorage.setItem('access_token',res.data.access_token);
                    sessionStorage.setItem('refresh_token',res.data.refresh_token);
                }
            }
            }
            // 根据后端返回的 code 判断成功/失败
            return {...res,status:'error'};
        }
        if(res.code===0) {
            return res.data; // 返回 data 部分
        }
    },
    (error) => {
        console.error('响应错误:', error);
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                alert('登录过期，请重新登录');
                // 比如跳转登录页
            } else if (status === 500) {
                alert('服务器错误，请稍后再试');
            }
        }
        return {...error,status:'errors'};
    }
);

export default service;
