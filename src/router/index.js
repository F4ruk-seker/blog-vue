import { createRouter, createWebHistory } from 'vue-router'

import HomePageView from "@/views/HomePageView.vue";
import NotFound from "@/views/NotFoundView.vue";
import BlogReadView from "@/views/BlogReadView.vue";
import AdminBaseView from "@/views/AdminBaseView.vue";

const routes = [

    {
        path: '/',
        name: 'home_page',
        component: HomePageView
    },
    {
        path: '/read/:slug',
        name: 'blog_read',
        component: BlogReadView,
        params: true
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminBaseView,
        children: [
            {
              path: 'login',
              name: 'admin_login',
              component: () => import(/* webpackChunkName: "admin_login" */ '../views/AdminLoginView.vue'),
            },
            {
              path: 'dashboard',
              name: 'admin_dashboard',
              component: () => import(/* webpackChunkName: "admin_login" */ '../views/AdminDashboard.vue'),
            },
        ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
