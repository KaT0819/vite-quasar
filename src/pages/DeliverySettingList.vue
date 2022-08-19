<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { exportFile, useQuasar, QTableProps, QTable, QTr } from 'quasar'
import axios from 'axios'

const columns: QTableProps['columns'] = [
  {
    name: 'deliveryCode',
    align: 'left',
    label: '配信設定コード',
    field: 'deliveryCode',
    sortable: true,
  },
  {
    name: 'clientCode',
    align: 'left',
    label: '顧客コード',
    field: 'clientCode',
    sortable: true,
  },
  {
    name: 'clientName',
    label: '顧客名',
    align: 'left',
    field: (row: DeliverySetting) => row.clientName,
    sortable: true,
    required: true,
  },
  {
    name: 'deliveryName',
    label: '配信設定名',
    align: 'left',
    field: (row: DeliverySetting) => row.deliveryName,
    sortable: true,
    required: true,
  },
  {
    name: 'status',
    label: '配信状況',
    align: 'left',
    // field: 'status',
    field: (row: DeliverySetting) => (row.status == '1' ? '起動中' : '停止中'),
    sortable: true,
  },
  {
    name: 'url',
    label: '配信URL',
    align: 'left',
    field: 'url',
    sortable: true,
    required: true,
  },
  {
    name: 'deliveryAlertSuppress',
    label: '配信アラート抑止',
    align: 'center',
    field: (row: DeliverySetting) => (row.deliveryAlertSuppress ? '抑止しない' : '抑止する'),
    sortable: true,
    required: true,
  },
  { name: 'actions', label: 'Actions', field: '', align: 'center' },
]

const visibleColumns = ref<string[]>([
  'clientName',
  'deliveryName',
  'status',
  'statusTrial',
  'url',
  'deliveryAlertSuppress',
  'actions',
])

interface DeliverySetting {
  [key: string]: string | number | boolean | undefined
  id: string
  clientCode: string
  clientName: string
  deliveryCode: string
  deliveryName: string
  url: string
  deliveryAlertSuppress: boolean
}

interface Row extends DeliverySetting {
  status: string
}

const rows = ref<Row[]>([])

const selected = ref([])
const $q = useQuasar()
const isLoading = ref<boolean>(false)

// 顧客コード
const clientCode = ref<string>('')
// 顧客名
const clientName = ref<string>('')
// 配信設定名
const deliveryName = ref<string>('')
// 対象カテゴリ
const status = ref('0')
const statusOptions = [
  {
    label: 'すべて',
    value: '0',
  },
  {
    label: '起動中',
    value: '1',
  },
  {
    label: '停止中',
    value: '2',
  },
]
// 対象カテゴリ
const categoryModel = ref('')
const categoryOptions = ['火災', '気象', '緊急', 'その他']
const initialPagination = ref({
  rowsPerPage: 0,
})
const search = ref<string>('')

// 初期表示
onMounted(() => {
  console.log('mounted')
  // 配信設定一覧取得
  onSearch()
})

// 検索
const onSearch = async () => {
  console.log('onSearch', clientCode.value, rows)
  isLoading.value = true

  await getDeliverySetting()

  rows.value = rows.value.filter((row: Row) => {
    console.log(row.clientName.includes(clientName.value))

    // ステータスの条件（すべての場合は、filter条件に含めない）
    const isEnableStatus = status.value !== '0'

    return (
      row.clientCode.includes(clientCode.value) &&
      row.clientName.includes(clientName.value) &&
      row.deliveryName.includes(deliveryName.value) &&
      (isEnableStatus ? row.status === status.value : true) &&
      row.clientName.includes(clientName.value)
    )
  })

  await sleep(1000)

  console.log(rows.value)
  isLoading.value = false
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

  const status = exportFile('table-export.csv', content, 'text/csv')

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    })
  }
}

// 修正
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

// 削除
const deleteRow = (props: QTr['props']) => {
  // do something
  rows.value = rows.value.filter((row) => row.id !== props.row.id)

  $q.notify({
    type: 'negative',
    multiLine: true,
    message: `削除した風 => ${JSON.stringify(props.row).split(',').join(', ')}`,
    timeout: 2000,
  })
}

// ステータス切替
const toggleStatus = async (props: QTr['props']) => {
  $q.notify({
    type: 'info',
    textColor: 'grey-10',
    multiLine: true,
    message: `配信設定切替しました => ${props.row.deliveryName}`,
    timeout: 2000,
  })
}

const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
}

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

const getDeliverySetting = async () => {
  const url = 'http://localhost:3000/delivery-settings'

  await axios
    .get(url)
    .then((response) => {
      rows.value = response.data
    })
    .then((error) => {
      console.log(error)
    })

  //   console.log(rows)
}

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
</script>

<template>
  <div class="q-px-md">
    <h2>配信設定一覧</h2>
  </div>
  <q-page class="flex justify-center">
    <div class="q-pa-md row" style="max-width: 1200px">
      <div class="q-gutter-md q-mb-md row col-10">
        <!-- 顧客コード -->
        <q-input v-model="clientCode" filled label="顧客コード" type="search" style="min-width: 150px">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- 顧客名 -->
        <q-input v-model="clientName" filled label="顧客名" type="search" style="min-width: 150px">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- 配信設定名 -->
        <q-input v-model="deliveryName" filled label="配信設定名" type="search" style="min-width: 150px">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- 対象カテゴリ -->
        <q-select
          v-model="categoryModel"
          clearable
          filled
          :options="categoryOptions"
          label="対象カテゴリ"
          style="min-width: 200px"
        />

        <!-- 状態 -->
        <q-option-group
          v-model="status"
          :options="statusOptions"
          color="primary"
          size="lg"
          label="状態"
          inline
          filled
          dense
          style=""
          class="flex flex-center"
        />
      </div>

      <div class="col-2 q-pa-md q-mb-md column items-end">
        <q-space />

        <!-- <q-btn label="検索" type="submit" color="primary" class="q-ml-md" style="min-width: 100px" /> -->
        <q-btn label="検索" @click="onSearch" color="primary" class="q-ml-md" style="min-width: 100px" />
      </div>
    </div>

    <div class="q-mb-md">
      <q-table
        v-model:selected="selected"
        v-model:pagination="initialPagination"
        class="my-sticky-virtscroll-table"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        separator="vertical"
        virtual-scroll
        :rows-per-page-options="[0]"
        :loading="isLoading"
        :grid="$q.screen.xs"
        :visible-columns="visibleColumns"
        :filter="search"
      >
        <template #loading>
          <q-inner-loading showing color="brown-5" label="読み込み中..." label-style="font-size: 2em">
            <q-spinner-hourglass color="brown-5" size="8em" />
          </q-inner-loading>
        </template>
        <template #top-right="props">
          <div class="q-gutter-md q-mb-md row">
            <q-input dense debounce="400" color="primary" v-model="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn color="primary" icon-right="archive" label="Export to csv" no-caps @click="exportTable" />
            <q-btn
              class="q-ml-md"
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
            />
          </div>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            {{ props.row.status == '1' ? '起動中' : '停止中' }}
            <q-btn dense color="brown-5" @click="toggleStatus(props)">切替</q-btn>
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="brown-5" icon="edit" @click="editRow(props)"></q-btn>
            <q-btn dense round flat color="brown-5" icon="delete" @click="deleteRow(props)"></q-btn>
          </q-td>
        </template>
      </q-table>

      <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
    </div>
    <!-- place QPageScroller at end of page -->
    <q-page-scroller expand position="top" :scroll-offset="150" :offset="[0, 0]">
      <div class="col cursor-pointer q-pa-sm bg-accent text-white text-center">Scroll back up...</div>
    </q-page-scroller>
  </q-page>
</template>

<style lang="sass" scoped>
.my-sticky-virtscroll-table
  /* height or max-height is important */
  //height: 610px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $brown-5
    color: $grey-3
    font-weight: bold
    font-size: 16px

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
