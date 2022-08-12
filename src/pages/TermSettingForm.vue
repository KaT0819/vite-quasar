<script setup lang="ts">
import { ref } from 'vue'
import { QDate } from 'quasar'

const date = new Date()
// QDate.setToday();
const deliveryTermFrom = ref(date.toString())
const deliveryTermTo = ref(date.toString())
const deliveryTargetMonths = ref('')
const deliveryTargetWeekdays = ref('')
const deliveryStartTime = ref('')
const deliveryEndTime = ref('')
interface DateRange {
  [key: string]: string
  from: string
  to: string
}
const dateRange = ref<DateRange>({
  from: '',
  to: '',
})

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
    <h2>期間設定</h2>
  </div>
  <q-page class="flex justify-center">
    <div class="q-pa-md" style="max-width: 800px">
      <q-form action="/delivery-setting" class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <div class="q-gutter-md row items-start">
          <q-input v-model="deliveryTermFrom" filled mask="date" :rules="['date']" label="配信開始日付 *">
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="deliveryTermFrom" color="brown-5">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input v-model="deliveryTermTo" filled mask="date" :rules="['date']" label="配信終了日付 *">
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="deliveryTermTo" color="brown-5">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="q-gutter-md row items-start">
          <q-input v-model="dateRange['from']" filled label="開始時刻 *" />
          <q-input v-model="dateRange['to']" filled label="開始時刻 *" />
          <q-space />
          <q-date v-model="dateRange" range color="brown-5" landscape />
        </div>

        <div class="q-gutter-md items-start">
          <q-item-label>配信対象月</q-item-label>
          <q-btn-toggle
            v-model="deliveryTargetMonths"
            filled
            label="配信対象月"
            :options="[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
              { label: '6', value: '6' },
              { label: '7', value: '7' },
              { label: '8', value: '8' },
              { label: '9', value: '9' },
              { label: '10', value: '10' },
              { label: '11', value: '11' },
              { label: '12', value: '12' },
            ]"
          />

          <q-item-label>配信対象曜日</q-item-label>
          <q-btn-toggle
            v-model="deliveryTargetWeekdays"
            filled
            label="配信対象曜日"
            :options="[
              { label: '月', value: '1' },
              { label: '火', value: '2' },
              { label: '水', value: '3' },
              { label: '木', value: '4' },
              { label: '金', value: '5' },
              { label: '土', value: '6' },
              { label: '日', value: '7' },
            ]"
          />
        </div>

        <div class="q-gutter-md row items-start">
          <q-input v-model="deliveryStartTime" filled label="開始時刻 *" />
          <q-input v-model="deliveryEndTime" filled label="終了時刻 *" />
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
