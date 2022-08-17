<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import UUID from 'uuidjs'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const onReset = () => {
  console.log('onReset')
  router.push('/client')
}

// 顧客当億
const postClient = async () => {
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

  await axios
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
      <q-form action="/client" class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <div class="q-gutter-md">
          <q-input
            v-model="code"
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
            v-model="name"
            filled
            label="顧客名 *"
            hint="企業名、団体名など"
            style="min-width: 150px; width: 60%"
            clearable
            lazy-rules
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
            lazy-rules
            :rules="[
              (val) => !!val || '* 値を入力してください',
              (val) => val.length <= 255 || '255文字以内で入力してください',
            ]"
          />
        </div>
        <div class="q-gutter-md">
          <q-space />
          <q-btn label="キャンセル" type="reset" size="lg" color="primary" flat class="q-ml-md" @click="onReset" />
          <q-btn label="登録" type="submit" color="primary" class="q-ml-md" @click="onSubmit" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped></style>
