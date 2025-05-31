// src/utils/request.js
import axios from 'axios';



// 创建实例
const service = axios.create({
    baseURL: '/api', // ✅ 使用代理路径
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
    (response) => {
        const res = response.data;
        if (res.code !== 0) {
            // 根据后端返回的 code 判断成功/失败
            console.warn('接口报错:', res.message || '接口错误');
            return {...res,status:'error'};
        }
        return res.data; // 返回 data 部分
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