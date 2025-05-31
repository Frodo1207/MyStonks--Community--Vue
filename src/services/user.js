import request from '@/utils/request';

export function getUserInfo() {
    return request.get('/user/info');
}

export function walletLogin(data) {
    return request.post('/v1/auth/login', data);
}

/** 获取登陆随机数*/
export function getRandom(){
    return request.get('/v1/auth/nonce');
}

/** 刷新令牌 */
export function refreshToken(){
    return request.get('/v1/auth/refresh');
}