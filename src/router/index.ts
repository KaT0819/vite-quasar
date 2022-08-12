import {
  RouteRecordRaw,
  //   createMemoryHistory,
  createRouter,
  //   createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import Index from '@/pages/IndexPage.vue'
import Error404 from '@/pages/Error404Page.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', component: Index, name: 'インデックス' }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: Error404,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
