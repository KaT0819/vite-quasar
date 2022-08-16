<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import UUID from 'uuidjs'
import { useRouter } from 'vue-router'

const clientCode = ref<string>('')
const clientName = ref<string>('')
const deliveryCode = ref<string>('')
const deliveryName = ref<string>('')
const deliveryUrl = ref<string>('')
const deliveryAlertSuppress = ref<boolean>(true)
const router = useRouter()

interface DeliverySetting {
  id: string
  clientCode: number
  deliveryCode: string
  deliveryName: string
  url: string
  deliveryAlertSuppress: boolean
}
const post = ref<DeliverySetting>()

const onSubmit = (event?: Event) => {
  console.log('onSubmit', event)

  if (event == undefined) {
    return
  }

  // 配信設定当億
  postDeliverySetting()

  if (event.target instanceof HTMLFormElement) {
    event.target.submit()
  }
}

const onReset = () => {
  console.log('onReset')
  router.push('/delivery-setting')
}

const deliveryAlertSuppressLabel = () => {
  if (deliveryAlertSuppress.value) {
    return 'アラートメール抑止しない'
  } else {
    return 'アラートメール抑止する'
  }
}

// 配信設定当億
const postDeliverySetting = async () => {
  const url = 'http://localhost:3000/delivery-settings'

  // UUIDを生成
  const id = UUID.generate()
  console.log(id)

  post.value = {
    id: id,
    clientCode: 1,
    deliveryCode: deliveryCode.value,
    deliveryName: deliveryName.value,
    url: deliveryUrl.value,
    deliveryAlertSuppress: deliveryAlertSuppress.value,
  }

  await axios
    .post(url, post.value)
    .then((response) => {
      console.log(response)
      //   router.push('/delivery-setting')
    })
    .then((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="q-px-md">
    <h2>配信設定登録</h2>
  </div>
  <q-page class="">
    <div class="q-pa-md" style="max-width: 800px">
      <q-form action="/delivery-setting" class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <div class="q-gutter-md">
          <q-input
            v-model="clientCode"
            filled
            label="顧客コード *"
            hint="数値 0-9"
            style="min-width: 150px"
            clearable
            lazy-rules
            :rules="[
              (val) => !!val || '* 値を入力してください',
              (val) => val.length <= 10 || '10文字以内で入力してください',
            ]"
          />

          <q-input
            v-model="clientName"
            filled
            label="顧客名 *"
            hint="企業名、団体名など ※顧客名はリストで選択"
            style="min-width: 150px; width: 50%"
            clearable
            lazy-rules
            :rules="[(val) => !!val || '* 値を入力してください']"
          />

          <q-input
            v-model="deliveryCode"
            filled
            label="配信コード *"
            hint="数値 0-9"
            style="min-width: 150px"
            clearable
            lazy-rules
            :rules="[
              (val) => !!val || '* 値を入力してください',
              (val) => val.length <= 10 || '10文字以内で入力してください',
            ]"
          />
          <!-- 配信設定名 -->
          <q-input
            v-model="deliveryName"
            filled
            label="配信設定名 *"
            style="min-width: 150px; width: 50%"
            clearable
            lazy-rules
            :rules="[
              (val) => !!val || '* 値を入力してください',
              (val) => val.length <= 40 || '40文字以内で入力してください',
            ]"
          />

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
          <!-- <q-btn to="/delivery-setting" label="キャンセル" size="lg" color="primary" flat class="q-ml-md" /> -->
          <q-btn label="キャンセル" type="reset" size="lg" color="primary" flat class="q-ml-md" />
          <q-btn label="登録" type="submit" color="primary" class="q-ml-md" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped></style>
