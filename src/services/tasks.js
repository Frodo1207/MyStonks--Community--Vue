import service from "@/utils/request.js";

/** 获取新手任务 */
export async function getNewbieTasks() {
    var addr = localStorage.getItem("solAddr");
    return await service.get('api/v1/tasks?category=newbie&addr=' + addr);
}

/** 获取每日任务 */
export async function getDailyTasks() {
    var addr = localStorage.getItem("solAddr");
    return await service.get('api/v1/tasks?category=daily&addr=' + addr);
}

/** 获取其他任务 */
export async function getOtherTasks() {
    var addr = localStorage.getItem("solAddr");
    return await service.get('api/v1/tasks?category=other&addr=' + addr);
}

/** 获取用户任务系统信息 */
export async function getUserTasksInfo(addr) {
    return await service.get('/api/v1/user/task?addr=' + addr);
}

/** 获取用户任务完成情况 */
export async function checkTaskIsComplete(userid, task_id) {
    return await service.get('/api/v1/task/complete?user_id=' + userid + '&task_id=' + task_id);
}

/** 获取用户任务完成情况 */
export async function getStonksTradeRes() {
    let addr = localStorage.getItem("solAddr");
    return await service.get('/api/v1/task/stonks/trade?sol_address=' + addr);
}

/** 完成任务api */
export async function completeTask(task_id) {
    let addr = localStorage.getItem("solAddr");
    return await service.get('/api/v1/task/finish?addr=' + addr + "&task_id="+ task_id);
}

/** 获取积分榜 */
export async function getRankBoard() {
    return await service.get('/api/v1/task/rankbord');
}

