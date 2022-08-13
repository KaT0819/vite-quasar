<script setup lang="ts">
import { ref } from 'vue'

const code = ref<string>('')
const name = ref<string>('')
const deliveryName = ref<string>('')
const deliveryUrl = ref<string>('')
const deliveryAlertSuppress = ref<boolean>(true)

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

const deliveryAlertSuppressLabel = () => {
  if (deliveryAlertSuppress.value) {
    return 'アラートメール抑止しない'
  } else {
    return 'アラートメール抑止する'
  }
}
</script>

<template>
  <div class="q-px-md">
    <h2>配信設定登録</h2>
  </div>
  <q-page class="flex justify-center">
    <div class="q-pa-md" style="max-width: 800px">
      <q-form action="/delivery-setting" class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <div class="q-gutter-md row items-start">
          <q-input
            v-model="code"
            filled
            label="顧客コード *"
            hint="数値 0-9"
            style="min-width: 150px"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '入力必須です']"
          />

          <q-input
            v-model="name"
            filled
            label="顧客名 *"
            hint="企業名、団体名など ※顧客名はリストで選択"
            style="min-width: 150px; width: 50%"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '入力必須です']"
          />
        </div>
        <div class="q-gutter-md row items-start">
          <!-- 配信設定名 -->
          <q-input
            v-model="deliveryName"
            filled
            label="配信設定名 *"
            style="width: 100%"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '入力必須です']"
          />
        </div>
        <div class="q-gutter-md">
          <!-- 接続先 -->
          <q-input v-model="deliveryUrl" filled label="接続先 *" hint="接続先のURL" type="url" />

          <!-- アラートメール抑止 -->
          <q-toggle
            v-model="deliveryAlertSuppress"
            color="pink"
            checked-icon="mail"
            unchecked-icon="clear"
            size="xl"
            :label="deliveryAlertSuppressLabel()"
          />
        </div>

        <div>
          <q-btn label="キャンセル" type="reset" size="lg" color="primary" flat class="q-ml-md" />
          <q-btn label="登録" type="submit" color="primary" class="q-ml-md" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped></style>
