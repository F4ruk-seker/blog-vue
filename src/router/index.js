import { createRouter, createWebHistory } from 'vue-router'

import HomePageView from "@/views/HomePageView.vue";
import NotFound from "@/views/NotFoundView.vue";
import BlogReadView from "@/views/BlogReadView.vue";

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
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
