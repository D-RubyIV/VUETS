<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  message: string;
  obj: Object
}>();


watch(() => props.obj, (newValue, oldValue) => {
  console.log('Old:', oldValue, 'New:', newValue);
}, { deep: true });


</script>

<template>
  <p style="font-size: 18px">{{ message }}</p>
</template>
