<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/max-attributes-per-line -->
<script setup lang="ts">
import { ref } from 'vue'

const area1 = ref('')
const area2 = ref('')
const area3 = ref('')

const area1Options = ref(['北海道', '東北', '関東', '中部', '関西', '中国', '四国', '九州', '沖縄'])
const area2Options = ref([
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
])
const area3Options = ref(['北海道'])

const onSubmit = (event?: Event) => {
  console.log('onSubmit', event)

  if (event == undefined) {
    return
  }
  if (event.target instanceof HTMLFormElement) {
    event.target.submit()
  }
}

const onReset = (event?: Event) => {
  if (event == undefined) {
    return
  }
  console.log('onReset', event)
}
</script>

<template>
  <div class="q-px-md">
    <h2>地域設定</h2>
  </div>
  <q-page class="flex justify-center">
    <div class="q-pa-md" style="max-width: 800px">
      <q-form class="q-gutter-md" action="/delivery-setting" @submit="onSubmit" @reset="onReset">
        <div class="q-gutter-md row items-start">
          <!-- 地域 -->
          <q-select v-model="area1" clearable filled :options="area1Options" label="地域1" style="min-width: 200px" />
          <!-- 地域 -->
          <q-select v-model="area2" clearable filled :options="area2Options" label="地域2" style="min-width: 200px" />
          <!-- 地域 -->
          <q-select v-model="area3" clearable filled :options="area3Options" label="地域3" style="min-width: 200px" />
        </div>

        <div>
          <q-btn label="キャンセル" type="reset" size="lg" color="primary" flat class="q-ml-md" />
          <q-btn label="登録" type="submit" color="primary" class="q-ml-md" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="sass" scoped></style>
