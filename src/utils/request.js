// src/utils/request.js
import axios from 'axios';

// 创建实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Vite 项目用 env
    timeout: 10000, // 超时 10 秒
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // 其他自定义 header 可以在这里加
        return config;
    },
    (error) => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 0) {
            // 根据后端返回的 code 判断成功/失败
            console.warn('接口报错:', res.message || '接口错误');
            return Promise.reject(res);
        }
        return res; // 返回 data 部分
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
        return Promise.reject(error);
    }
);

export default service;