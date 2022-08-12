import {
  RouteRecordRaw,
  //   createMemoryHistory,
  createRouter,
  //   createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { URL } from '@/const/url'

import MainLayout from '@/layouts/MainLayout.vue'
import Index from '@/pages/IndexPage.vue'
import Login from '@/pages/UserLogin.vue'
import ClientList from '@/pages/ClientList.vue'
import ClientForm from '@/pages/ClientForm.vue'
import DeliverySettingList from '@/pages/DeliverySettingList.vue'
import DeliverySettingForm from '@/pages/DeliverySettingForm.vue'
import AreaSettingForm from '@/pages/AreaSettingForm.vue'
import TermSettingForm from '@/pages/TermSettingForm.vue'
import Error404 from '@/pages/Error404Page.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index, name: 'インデックス' },
      { path: 'login', component: Login, name: 'ログイン' },
      { path: `${URL.CLIENT}`, component: ClientList },
      { path: `${URL.CLIENT}/create`, component: ClientForm },
      { path: `${URL.CLIENT}/:_id/edit`, component: ClientForm },
      { path: `${URL.DELIVERY_SETTING}`, component: DeliverySettingList },
      {
        path: `${URL.DELIVERY_SETTING}/create`,
        component: DeliverySettingForm,
      },
      {
        path: `${URL.DELIVERY_SETTING}/:_id/edit`,
        component: DeliverySettingForm,
      },
      {
        path: `area-setting/create`,
        component: AreaSettingForm,
      },
      {
        path: `term-setting/create`,
        component: TermSettingForm,
      },
    ],
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
