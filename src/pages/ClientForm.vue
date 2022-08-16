<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import UUID from 'uuidjs'

// const id = ref('');
const code = ref<string>('')
const name = ref<string>('')
const email = ref<string>('')

// 顧客
interface Client {
  id: string
  code: number
  name: string
  email: string
}

const post = ref<Client>()

const onSubmit = (event?: Event) => {
  console.log('onSubmit', event)

  if (event == undefined) {
    return
  }
  if (event.target instanceof HTMLFormElement) {
    // 顧客当億
    postClient()
    event.target.submit()
  }
}

const onReset = (event?: Event) => {
  if (event == undefined) {
    return
  }
  console.log('onReset', event)
}

// 顧客当億
const postClient = () => {
  const url = 'http://localhost:3000/clients'

  // UUIDを生成
  const id = UUID.generate()
  console.log(id)

  post.value = {
    id: id,
    code: Number(code.value),
    name: name.value,
    email: email.value,
  }

  axios
    .post(url, post.value)
    .then((response) => {
      console.log(response)
    })
    .then((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="q-px-md">
    <h2>顧客情報登録</h2>
  </div>
  <q-page class="flex justify-center">
    <div class="q-pa-md" style="max-width: 800px">
      <q-form class="q-gutter-md" action="/client" @submit="onSubmit" @reset="onReset">
        <div class="q-gutter-md row items-start">
          <q-input
            v-model="code"
            filled
            label="顧客コード *"
            hint="数値 0-9"
            style="min-width: 150px"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            v-model="name"
            filled
            label="顧客名 *"
            hint="企業名、団体名など"
            style="min-width: 150px; width: 60%"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
        </div>

        <div class="q-gutter-md row items-start">
          <q-input
            v-model="email"
            filled
            type="email"
            size="lg"
            label="担当者メールアドレス *"
            hint="Email"
            style="width: 100%"
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

<style lang="sass" scoped></style>
