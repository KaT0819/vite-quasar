<template>
  <div class="q-px-md">
    <h2>TOP {{ name }}</h2>
  </div>
  <q-page class="flex justify-center">
    <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
  </q-page>
</template>

<script setup lang="ts">
const name = 'PageIndex'
</script>

<style scoped>
.logo {
  height: 32em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
