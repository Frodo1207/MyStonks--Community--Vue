import request from '@/utils/request';

export function getUserInfo() {
    return request.get('/user/info');
}

export function login(data) {
    return request.post('/auth/login', data);
}