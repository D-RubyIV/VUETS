import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import MatchSyntaxMatchOnlyNumber from '@/views/MatchSyntaxMatchOnlyNumber.vue'
import ChapterView from '@/views/ChapterPlusView.vue'
import ChapterMultiplierView from '@/views/ChapterMultiplierView.vue'
import OptionalParameters from '@/views/OptionalParameters.vue'

const updateTemplate = {
  template: '<p>Hello {{ $route.params.id }}</p>'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/customer/:id/:age',
      name: 'update',
      component: DetailView,
      sensitive: true
    },
    {
      path: '/orders/:orderId(\\d+)',
      component: MatchSyntaxMatchOnlyNumber
    },
    {
      path: '/chapter-plus/:chapters+',
      component: ChapterView
    },
    {
      path: '/chapter-multiplier/:chapters(\\d+)*',
      component: ChapterMultiplierView
    },
    {
      path: '/optional/:userId?',
      name: "optionalRoute",
      component: OptionalParameters
    },
  ]
})

export default router
