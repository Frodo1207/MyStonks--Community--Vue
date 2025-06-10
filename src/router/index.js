import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeView/index.vue'
import ActivityView from '../views/ActivityView.vue'
import AllActivityView from "@/views/AllActivityView.vue";
import CommunityMerchView from "@/views/CommunityMerchView.vue"
import TaskCenterView from "@/views/TaskCenterView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/activity/:id',
        name: 'activity',
        component: ActivityView,
        props: true
    },
    {
        path: '/activities',
        name: 'AllActivityView',
        component: AllActivityView,
        props: true
    },
    {
        path: '/governance',
        name: 'Governance',
        component: () => import('@/views/CommunityMerchView.vue')
    },
    {
        path: '/merch',
        name: 'Merch',
        component: CommunityMerchView,
        meta: {
            title: '社区周边 - Web3社区'
        }
    },
    {
        path: '/taskcenter',
        name: 'taskcenter',
        component: TaskCenterView,
        meta: {
            title: '社区周边 - Web3社区'
        }
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
