import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '@/views/TestView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from "@/views/ManageView.vue";
import Bai1Bai2View from "@/views/Bai1Bai2View.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/testing',
      name: 'testing',
      component: TestView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManageView
    },
    {
      path: '/ex12',
      name: 'ex12',
      component: Bai1Bai2View
    }
  ]
})

export default router
