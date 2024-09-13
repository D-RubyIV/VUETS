<script lang="ts" setup>
import {ref, watch} from 'vue';
import ShowMessage222 from "@/components/table/ShowMessage222.vue";
import {defineComponent} from 'vue';

const props = defineProps<{
  message: string;
  obj: Object
}>();

const emit = defineEmits();
watch(() => props.obj, (newValue, oldValue) => {
  console.log("Binh thg")

  // console.log('Old 1:', oldValue, 'New:', newValue);
}, {deep: true});

function childMethod(obj) {
  console.log("Abc", obj);
  emit("haha", obj)
}

// Expose phương thức để có thể truy cập từ component cha
defineExpose({
  childMethod
});

</script>
<template>
  <ShowMessage222 :message="message" :obj="obj"></ShowMessage222>
  <p style="font-size: 18px">{{ message }}</p>
</template>
