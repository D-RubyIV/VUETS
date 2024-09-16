<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import CourseModal from '@/views/course/CourseModal.vue'
import axios from 'axios'
import type { ComponentSize } from 'element-plus'
import { instance } from '@/axios/customaxios'

const data = ref<Course[]>([])
const isOpenModal = ref<boolean>(false)
const object = ref<Course | {}>({})
const isDisableForm = ref<boolean>(false)
const action = ref<string>('')

const pageIndex = ref<number>(1)
const totalPage = ref<number>(0)
const pageSize = ref<number>(5)
const totalElement=  ref<number>(0)

const size = ref<ComponentSize>('default')

const calculateTotalPages = (totalElement: number, pageSize: number): number => {
  if (totalElement <= 0) {
    throw new Error('Số lượng phần tử trên mỗi trang phải lớn hơn 0.')
  }
  console.log("Page Count: ",Math.ceil(totalElement / pageSize))
  totalPage.value = Math.ceil(totalElement / pageSize)
  return totalPage.value
}

watch(pageIndex, (newValue, oldValue) => {
  console.log('OLD Page', oldValue)
  fetchAll();

})


watch(object, (newValue, oldValue) => {
  console.log('OLD PARENT', oldValue)
  console.log('NEW PARENT', newValue)
}, { immediate: true, deep: true })

onMounted(() => {
  fetchAll()
})

const fetchAll = async () => {
  await instance
    .get(`courses?page=${pageIndex.value - 1}`)
    .then((response) => {
      console.log(response.data)
      data.value = response.data.content
      totalElement.value = response.data.totalElements
      calculateTotalPages(response.data.totalElements, pageSize.value)
    })
}

function onCreate() {
  object.value = {}
  isOpenModal.value = true
  isDisableForm.value = false
  action.value = 'CREATE'
}

const findById = async (id: number) => {
  try {
    const response = await instance.get(`courses/${id}`)
    object.value = response.data

  } catch (error) {
    console.error('Error fetching course details:', error)
  }
}


const onDetail = async (id: number) => {
  isOpenModal.value = true
  isDisableForm.value = true
  action.value = 'DETAIL'
  findById(id)
}


const onUpdate = async (id: number) => {
  isOpenModal.value = true
  isDisableForm.value = false
  action.value = 'UPDATE'
  findById(id)
}

const onDelete = async (id: number) => {
  isOpenModal.value = true
  isDisableForm.value = false
  action.value = 'DELETE'
  findById(id)
}


function formatStatus(status: number) {
  console.log(status)
  switch (status) {
    case 0:
      return 'Inactive'
    case 1:
      return 'Active'
    default:
      return 'Unknown'
  }
}

const handleCurrentChange = (val: number) => {
  pageIndex.value = val
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)

}

function onCloseModal() {
  isOpenModal.value = false
}

</script>

<template>
  <main>
    <div style="display: flex; justify-content: end">
      <el-button @click="onCreate">Add</el-button>
    </div>
    <div>
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="code" label="Code" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="image" label="Image" />
        <el-table-column prop="status" label="Status">
          <template #default="scope">
            <span>{{ formatStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="createdDate" label="CreatedDate" width="100" />
        <el-table-column prop="updateDate" label="UpdateDate" width="100" />
        <el-table-column width="300" label="Action">
          <template #default="scope">
            <el-button @click="onDetail(scope.row.id)">Detail</el-button>
            <el-button @click="onUpdate(scope.row.id)">Update</el-button>
            <el-button @click="onDelete(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        :current-page=pageIndex
        :page-size="pageSize"
        :size="size"
        layout="total, prev, pager, next"
        :total="totalElement"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-if="isOpenModal">
      <CourseModal
        :isOpenModal="isOpenModal"
        @onCloseModal="onCloseModal"
        :object="object"
        :action="action"
        @fetchAllAgain="fetchAll"
      ></CourseModal>
    </div>
  </main>
</template>
