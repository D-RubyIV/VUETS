<template>
  <div>
    <p> User {{ $route.params.id }} - Age: {{ $route.params.age}}</p>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onBeforeMount, onMounted } from 'vue'
const route = useRoute();
console.log(route.params.id, route.params.age); // Lấy giá trị param 'userId'
console.log(route.params.id, route.params.age, route.query); // Lấy giá trị param 'userId'
</script>