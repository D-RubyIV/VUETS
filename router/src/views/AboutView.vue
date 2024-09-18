<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter();

// Hàm chuyển hướng với params
const pushWithParams = () => {
  router.push({ name: 'update', params: { id: 123, age: 67 } });
};

// Hàm chuyển hướng với query
const pushWithQuery = () => {
  router.push({
    name: 'update',  // Đảm bảo rằng route của bạn có name là 'Customer'
    params: { id: 123, age: 67 },
    query: { search: 'Vue' }
  });
};


</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click="pushWithParams">Go to User with Params</button>
    <button @click="pushWithQuery">Go to User with Query</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
