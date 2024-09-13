<script setup lang="ts">

import type { Energy } from '@/views/env/index'
import { computed, type PropType } from 'vue'

const props = defineProps({
  data: {
    type: Array as PropType<Energy[]>,
    required: true
  }
});

const sortedData = computed(() => {
  return [...props.data].sort((a, b) => a.price - b.price);
});

</script>

<template>
  <main>
    <div>
      <el-table :data="sortedData" style="width: 100%">
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="code" label="Code" width="180" />
        <el-table-column prop="min" label="Min" />
        <el-table-column prop="max" label="Max" />
        <el-table-column prop="price" label="Price" />
      </el-table>
    </div>
  </main>
</template>
