<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import CourseModal from '@/views/course/CourseModal.vue'
import axios from 'axios'

const data = ref<Course[]>([])
const isOpenModal = ref<boolean>(false)
const object = ref<Course|{}>({})
const isDisableForm = ref<boolean>(false)


watch(object, (newValue, oldValue ) => {
  console.log("OLD", oldValue)
  console.log("NEW", newValue)
})

onMounted(() => {
  axios
    .get('http://localhost:8080/api/v1/courses')
    .then((response) => {
      console.log(response.data)
      data.value = response.data.content
    })
})

function onCreate() {
  isOpenModal.value = true
}

const onDetail = async (id: number) => {
  isOpenModal.value = true;
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/courses/${id}`);
    object.value = response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
  }
};


function onUpdate() {
  isOpenModal.value = true
}

function onDelete() {
  isOpenModal.value = true
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
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="createdDate" label="CreatedDate" width="100" />
        <el-table-column prop="updateDate" label="UpdateDate" width="100" />
        <el-table-column width="300" label="Action">
          <template #default="scope">
            <el-button @click="onDetail(scope.row.id)">Detail</el-button>
            <el-button>Update</el-button>
            <el-button>Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="isOpenModal">
      <CourseModal @onCloseModal="onCloseModal" :object="object"></CourseModal>
    </div>
  </main>
</template>
