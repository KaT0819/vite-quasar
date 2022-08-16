<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { exportFile, useQuasar, QTableProps, QTr } from 'quasar'
import axios from 'axios'

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
    field: (row: Client) => row.name,
    sortable: true,
  },
  {
    name: 'email',
    label: 'メールアドレス',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  { name: 'actions', label: 'Actions', field: '', align: 'center' },
]

// 顧客
interface Client {
  [key: string]: string | number | undefined
  id: string
  code: number
  name: string
  email: string
}

// // 顧客一覧
const rows = ref<Client[]>([])

const wrapCsvValue = (
  val: string,
  formatFn?: ((arg0: string, arg1: Client | undefined) => string) | undefined,
  row?: Client
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

onMounted(() => {
  console.log('mounted')
  // 顧客一覧取得
  getClient()
})

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
      rows.value.map((row: Client) =>
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

const editRow = (props: QTr['props']) => {
  // do something
  $q.notify({
    type: 'info',
    textColor: 'grey-10',
    multiLine: true,
    message: `I'll edit row data => ${JSON.stringify(props.row).split(',').join(', ')}`,
    timeout: 2000,
  })
}

const deleteRow = (props: QTr['props']) => {
  // do something
  $q.notify({
    type: 'negative',
    multiLine: true,
    message: `I'll delete row data => ${JSON.stringify(props.row).split(',').join(', ')}`,
    timeout: 2000,
  })
}

const getClient = () => {
  const url = 'http://localhost:3000/clients'

  axios
    .get(url)
    .then((response) => {
      rows.value = response.data
      //   console.log(rows.value)
      //   rows.value.forEach((r: Row) => {
      //     r.actions = ''
      //     console.log(r)
      //   })
    })
    .then((error) => {
      console.log(error)
    })

  console.log(rows)
}
</script>

<template>
  <div class="q-px-md">
    <h3>顧客一覧</h3>
  </div>
  <q-page class="flex justify-center" padding>
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
        title-class="text-h4 text-white"
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
        :selected-rows-label="getSelectedString"
        selection="multiple"
        virtual-scroll
        :rows-per-page-options="[0]"
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
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="brown-5" icon="edit" @click="editRow(props)"></q-btn>
            <q-btn dense round flat color="brown-5" icon="delete" @click="deleteRow(props)"></q-btn>
          </q-td>
        </template>
      </q-table>

      <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
    </div>
  </q-page>
</template>

<style lang="sass">
// scopedを指定すると効かなくなる
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 610px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $brown-4
    color: $grey-3
    font-weight: bold
    font-size: 16px


  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 148px
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
