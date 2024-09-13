import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import BaseAuth from '@/views/BaseAuth.vue'
import Layout from '@/views/dashboard/Layout.vue'
import EnvView from '@/views/env/EnvView.vue'
import CourseTable from '@/views/course/CourseTable.vue'
import CourseView from '@/views/course/CourseView.vue'
// Assuming you're using Pinia or another state management for global state

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '/auth',
          component: BaseAuth,
          children: [
            {
              path: 'signin',
              name: 'signin',
              component: SignIn
            },
            {
              path: 'signup',
              name: 'signup',
              component: SignUp
            }
          ]
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Layout,
          children: [
            {
              path: '',
              name: 'index',
              component: DashBoard
            },
            {
              path: 'env',
              name: 'env',
              component: EnvView
            },
            {
              path: 'course',
              name: 'course',
              component: CourseView
            }
          ]
        }
      ]
    }
  ]
})

export default router
