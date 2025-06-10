import service from "@/utils/request.js";

/** 获取全部活动接口 */
export async function getAllEvents() {
    return await service.get('api/v1/events');
}
