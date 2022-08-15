<!-- eslint-disable vue/max-attributes-per-line -->
<script setup lang="ts">
import { ref } from 'vue'

const id = ref<string>('')
const password = ref<string>('')
const isPwd = ref<boolean>(true)

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
    <h2>ログイン</h2>
  </div>
  <q-page class="flex justify-center">
    <div class="q-pa-md" style="max-width: 800px">
      <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <q-input
          v-model="id"
          filled
          label="ユーザID *"
          hint="ユーザID"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          label="パスワード *"
          hint="Password with toggle"
        >
          <template #append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped></style>
