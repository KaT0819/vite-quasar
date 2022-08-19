<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import UUID from 'uuidjs'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedClient = ref<Client>()
const deliveryCode = ref<string>('')
const deliveryName = ref<string>('')
const deliveryUrl = ref<string>('')
const deliveryAlertSuppress = ref<boolean>(true)

interface DeliverySetting {
  id: string
  clientCode: string
  deliveryCode: string
  deliveryName: string
  url: string
  deliveryAlertSuppress: boolean
}

const post = ref<DeliverySetting>()

// 顧客
interface Client {
  value: string
  label: string
}

// // 顧客一覧
const clients = ref<Client[]>([])

// アラート抑止のラベル
const deliveryAlertSuppressLabel = () => {
  if (deliveryAlertSuppress.value) {
    return 'アラートメール抑止しない'
  } else {
    return 'アラートメール抑止する'
  }
}

// 画面表示時
onMounted(() => {
  console.log('mounted')
  // 顧客一覧取得
  getClient()
})

// 登録ボタン
const onSubmit = (event?: Event) => {
  console.log('onSubmit', event)

  if (event == undefined) {
    return
  }

  if (event.target instanceof HTMLFormElement) {
    // 配信設定当億
    postDeliverySetting()
    // event.target.submit()
  }
}

// キャンセルボタン
const onReset = () => {
  console.log('onReset')
  router.push('/delivery-setting')
}

// 配信設定当億
const postDeliverySetting = async () => {
  const url = 'http://localhost:3000/delivery-settings'

  // UUIDを生成
  const id = UUID.generate()
  console.log(id)

  if (selectedClient.value == undefined) {
    return
  }

  post.value = {
    id: id,
    clientCode: selectedClient.value.value,
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

const getClient = () => {
  const url = 'http://localhost:3000/clients'

  axios
    .get(url)
    .then((response) => {
      //   clients.value = response.data
      response.data.forEach((e: any) => {
        clients.value.push({ label: e.name, value: e.code })
      })
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
  <q-page class="flex justify-content">
    <div class="q-pa-md q-gutter-md" style="max-width: 800px">
      <q-form action="/delivery-setting" class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <div class="row">
          <div class="col">
            <!-- 顧客名 -->
            <q-select v-model="selectedClient" clearable :options="clients" label="顧客名" />

            {{ selectedClient }}
          </div>
        </div>

        <div class="row">
          <div class="col-4 q-mr-md">
            <q-input
              v-model="deliveryCode"
              filled
              label="配信コード *"
              hint="数値 0-9"
              clearable
              lazy-rules
              :rules="[
                (val) => !!val || '* 値を入力してください',
                (val) => val.length <= 10 || '10文字以内で入力してください',
              ]"
            />
          </div>

          <div class="col-8">
            <!-- 配信設定名 -->
            <q-input
              v-model="deliveryName"
              filled
              label="配信設定名 *"
              clearable
              lazy-rules
              :rules="[
                (val) => !!val || '* 値を入力してください',
                (val) => val.length <= 40 || '40文字以内で入力してください',
              ]"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <!-- 接続先 -->
            <q-input v-model="deliveryUrl" filled label="接続先 *" hint="接続先のURL https://example.com" type="url" />

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
        </div>

        <div class="column items-end">
          <div class="col">
            <!-- <q-btn to="/delivery-setting" label="キャンセル" size="lg" color="primary" flat class="q-ml-md" /> -->
            <q-btn label="キャンセル" type="reset" size="lg" color="primary" flat class="q-ml-md" />
            <q-btn label="登録" type="submit" color="primary" class="q-ml-md" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped></style>
