<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import UUID from 'uuidjs'
import { useRouter } from 'vue-router'

// const id = ref('');
const code = ref<string>('')
const name = ref<string>('')
const email = ref<string>('')
const router = useRouter()

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
    // event.target.submit()
  }
  // 顧客当億
  postClient()
}

const onReset = (event?: Event) => {
  if (event == undefined) {
    return
  }
  console.log('onReset', event)
  router.push('/client')
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
      router.push('/client')
    })
    .then((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="q-px-md">
    <h3>顧客情報登録</h3>
  </div>
  <q-page padding class="">
    <div class="q-pa-md" style="max-width: 800px">
      <div class="q-gutter-md">
        <q-input
          v-model="code"
          filled
          label="顧客コード *"
          hint="数値 0-9"
          style="min-width: 150px"
          clearable
          :rules="[
            (val) => !!val || '* 値を入力してください',
            (val) => val.length <= 10 || '10文字以内で入力してください',
          ]"
        />

        <q-input
          v-model="name"
          filled
          label="顧客名 *"
          hint="企業名、団体名など"
          style="min-width: 150px; width: 60%"
          clearable
          :rules="[
            (val) => !!val || '* 値を入力してください',
            (val) => val.length <= 40 || '40文字以内で入力してください',
          ]"
        />

        <q-input
          v-model="email"
          filled
          type="email"
          size="lg"
          label="担当者メールアドレス *"
          hint="Email"
          style="width: 100%"
          clearable
          :rules="[
            (val) => !!val || '* 値を入力してください',
            (val) => val.length <= 255 || '255文字以内で入力してください',
          ]"
        />
      </div>
    </div>
    <div class="q-gutter-md">
      <q-space />
      <q-btn label="キャンセル" size="lg" color="primary" flat class="q-ml-md" @click="onReset" />
      <q-btn label="登録" color="primary" class="q-ml-md" @click="onSubmit" />
    </div>
  </q-page>
</template>

<style lang="sass" scoped></style>
