<script setup lang="ts">
import { ref } from 'vue'
import { exportFile, useQuasar, QTableProps } from 'quasar'

const columns: QTableProps['columns'] = [
  {
    name: 'code',
    align: 'left',
    label: '顧客コード',
    field: 'code',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: '顧客名',
    align: 'left',
    field: (row: Row) => row.name,
    sortable: true,
  },
  {
    name: 'email',
    label: 'メールアドレス',
    align: 'left',
    field: 'email',
    sortable: true,
  },
]

// 顧客
interface Row {
  [key: string]: string | number
  code: number
  name: string
  email: string
}

// const rows: { : Row }[] = [
const rows = ref<Row[]>([
  {
    code: 101,
    name: 'レヤプ・アイランド・フードソリューションズ',
    email: 'mailmailmailmailmail-01@email.com',
  },
  {
    code: 1210,
    name: 'コズミック・ワークショップ',
    email: 'mailmailmail-02@email.com',
  },
  { code: 1030, name: 'モデオゲリガカルニ', email: 'mailmail-03@email.com' },
  { code: 304, name: 'シンフォニーオーケストラ', email: 'mail-04@email.com' },
  {
    code: 1105,
    name: 'プリヴェンター・マーセナリー',
    email: 'mail-05@email.com',
  },
  { code: 506, name: '源六インフォマティスク', email: 'mail-06@email.com' },
  { code: 107, name: '塚由家', email: 'mail-07@email.com' },
  { code: 108, name: 'クニノサギリ綜合法律事務所', email: 'mail-08@email.com' },
  { code: 25, name: '澤江ロジスティクス', email: 'mail-09@email.com' },
  { code: 15, name: '民間軍事会社 XN&E社', email: 'mail-10@email.com' },
  { code: 35, name: '茶園オーディオ', email: 'mail-11@email.com' },
  { code: 51, name: '金折', email: 'mail-21@email.com' },
  { code: 52, name: '牛腸香料', email: 'mail-22@email.com' },
  { code: 53, name: 'セッパラ・エナジー', email: 'mail-23@email.com' },
  { code: 54, name: 'バフスシ飲料', email: 'mail-24@email.com' },
  { code: 55, name: '合同会社 Y&O', email: 'mail-25@email.com' },
  {
    code: 56,
    name: 'オーキッド・システムテクノロジー',
    email: 'mail-26@email.com',
  },
  { code: 57, name: 'ワールド・スペース', email: 'mail-27@email.com' },
  { code: 58, name: '名嘉村城定乳業', email: 'mail-28@email.com' },
  { code: 59, name: '栩木組', email: 'mail-29@email.com' },
  { code: 60, name: 'DCWF化学', email: 'mail-30@email.com' },
])

const wrapCsvValue = (
  val: string,
  formatFn?: ((arg0: string, arg1: Row | undefined) => string) | undefined,
  row?: Row
) => {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const $q = useQuasar()
const selected = ref([])
const isLoading = ref<boolean>(false)

const code = ref<string>('')
const name = ref<string>('')

const initialPagination = ref({
  // sortBy: 'asc',
  // descending: false,
  // page: 2,
  rowsPerPage: 0,
  // rowsNumber: xx if getting data from a server
})

//
const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
}

// CSVダウンロード
const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.value.map((row: Row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function' ? col.field(row) : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(',')
      )
    )
    .join('\r\n')

  const status = exportFile('client-list.csv', content, 'text/csv')

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    })
  }
}

const onSubmit = (event?: Event) => {
  console.log('onSubmit', event)

  if (event == undefined) {
    return
  }
  if (event.target instanceof HTMLFormElement) {
    event.target.submit()
  }
}
</script>

<template>
  <div class="q-px-md">
    <h2>顧客一覧</h2>
  </div>
  <q-page class="flex justify-center">
    <div class="q-pa-md" style="max-width: 1200px">
      <q-form class="q-mb-xl" @submit="onSubmit">
        <div class="q-gutter-md q-mb-md row">
          <!-- 顧客コード -->
          <q-input v-model="code" filled label="顧客コード" type="search" style="min-width: 150px">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>

          <!-- 顧客名 -->
          <q-input v-model="name" filled label="顧客名" type="search" style="min-width: 150px">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="q-gutter-md q-mb-md row">
          <q-space />

          <q-btn label="検索" type="submit" color="primary" class="q-ml-md" style="min-width: 100px" />
        </div>
      </q-form>

      <q-table
        v-model:selected="selected"
        v-model:pagination="initialPagination"
        class="my-sticky-virtscroll-table"
        title-class="text-h4"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        virtual-scroll
        :rows-per-page-options="[0]"
        :virtual-scroll-sticky-size-start="48"
        :loading="isLoading"
      >
        <template #top-right="props">
          <q-btn color="primary" icon-right="archive" label="Export to csv" no-caps @click="exportTable" />
          <q-btn
            class="q-ml-md"
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
        </template>
      </q-table>

      <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>

.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 610px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd
    font-weight: bold
    font-size: 16px
    color: #eee

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 148px
  thead tr:first-child th
    top: 0

.q-table
  thead
    background-color: #eee
    font-size: 16px
    z-index: 100
    position: sticky
    top: 0
</style>
