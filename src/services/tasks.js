import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:8000/', // ✅ 使用代理路径
    timeout: 30000,
});

/** 获取新手任务 */
export async function getNewbieTasks() {
    return await service.get('api/v1/tasks?category=newbie');
}

/** 获取每日任务 */
export async function getDailyTasks() {
    return await service.get('api/v1/tasks?category=daily');
}

/** 获取其他任务 */
export async function getOtherTasks() {
    return await service.get('api/v1/tasks?category=other');
}

/** 获取用户任务系统信息 */
export async function getUserTasksInfo(userid) {
    return await service.get('/api/v1/user/task?user_id=' + userid);
}

/** 获取用户任务完成情况 */
export async function checkTaskIsComplete(userid, task_id) {
    return await service.get('/api/v1/task/complete?user_id=' + userid + '&task_id=' + task_id);
}

/** 获取用户任务完成情况 */
export async function getStonksTradeRes(addr) {
    return await service.get('/api/v1/task/stonks/trade?sol_address=' + addr);
}
