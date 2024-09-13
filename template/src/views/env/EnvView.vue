<script lang="ts" setup>
import { ref, watch } from 'vue' // Import ref for reactivity
import type { Energy } from '@/views/env/index.js'
import EnvTable from '@/views/env/EnvTable.vue'
import ModalView from '@/views/env/ModalView.vue'

const data = ref<Energy[]>(
  [
    {
      name: 'Muc gia 1',
      code: '#01',
      min: 51,
      max: 100,
      price: 1000
    },
    {
      name: 'Muc gia 3',
      code: '#03',
      min: 401,
      max: 500,
      price: 1100
    },
    {
      name: 'Muc gia 2',
      code: '#02',
      min: 201,
      max: 300,
      price: 1100
    }
  ]
)
watch(data, (newValue, oldValue) => {
  console.log(`Doubled value changed from ${oldValue} to ${newValue}`)
})

function onCreate(item: Energy) {
  console.log('-------')
  console.log(item)
  data.value.push(item)
}

const isOpen = ref(false)

</script>

<template>
  <ModalView
    v-if="isOpen"
    @close="() => {isOpen = false}"
    @create="onCreate"
    :items-existing="data"></ModalView>
  <el-button @click="() => {isOpen = true}"
  >Add new
  </el-button>
  <EnvTable :data="data"></EnvTable>
</template>
