<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-brown-5 text-grey-3 q-py-xs" elevated height-hint="58">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn v-if="$q.screen.gt.xs" flat no-caps no-wrap class="q-ml-xs">
          <q-icon name="face" color="orange-3" size="48px" />
          <q-toolbar-title shrink class="text-weight-bold"> Vite-Quasar App </q-toolbar-title>
        </q-btn>

        <q-space />

        <div>Quasar v{{ $q.version }}</div>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat size="24px" color="grey-4" icon="notifications">
            <q-badge color="red" text-color="white" floating>2</q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="32px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="260">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-ripple to="/" exact clickable>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> トップ </q-item-section>
          </q-item>

          <q-item v-ripple to="/login" exact clickable>
            <q-item-section avatar>
              <q-icon name="edit_calendar" />
            </q-item-section>
            <q-item-section> ログイン </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-ripple to="/client" exact active clickable>
            <q-item-section avatar>
              <q-icon name="people_outline" />
            </q-item-section>
            <q-item-section> 顧客一覧 </q-item-section>
          </q-item>
          <q-item v-ripple to="/client/create" exact clickable>
            <q-item-section avatar>
              <q-icon name="people_outline" />
            </q-item-section>
            <q-item-section> 顧客登録 </q-item-section>
          </q-item>
          <q-item v-ripple to="/client/1/edit" exact clickable>
            <q-item-section avatar>
              <q-icon name="people_outline" />
            </q-item-section>
            <q-item-section> 顧客編集 </q-item-section>
          </q-item>
          <q-item v-ripple to="/delivery-setting" exact clickable>
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>
            <q-item-section> 配信設定一覧 </q-item-section>
          </q-item>
          <q-item v-ripple to="/delivery-setting/create" exact clickable>
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>
            <q-item-section> 配信設定登録 </q-item-section>
          </q-item>
          <q-item v-ripple to="/delivery-setting/1/edit" exact clickable>
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>
            <q-item-section> 配信設定編集 </q-item-section>
          </q-item>
          <q-item v-ripple to="/area-setting/create" exact clickable>
            <q-item-section avatar>
              <q-icon name="place" />
            </q-item-section>
            <q-item-section> 地域設定 </q-item-section>
          </q-item>
          <q-item v-ripple to="/term-setting/create" exact clickable>
            <q-item-section avatar>
              <q-icon name="edit_calendar" />
            </q-item-section>
            <q-item-section> 期間設定 </q-item-section>
          </q-item>
        </q-list>

        <q-separator class="q-mt-md q-mb-lg" />
        <q-list>
          <q-item-label header>リンク集</q-item-label>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink from '@/components/EssentialLink.vue'

const leftDrawerOpen = ref(false)

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style></style>
