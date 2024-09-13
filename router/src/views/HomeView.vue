<script setup lang="ts">

import router from '@/router'

function onPushMeToAbout(){
  router.push("/about")
}
function onPushMeToDetail(){
  router.push("/customer/1/18/")
}
function onPushMeToOptionalByName(){
  router.push({ name: 'optionalRoute', params: { userId: 'erina' } })
}

function onPushMeAboutReplace(){
  router.push({ path: '/about', replace: true })
  // router.replace({ path: '/about' })
}
</script>

<template>
  <main>
    <button @click="onPushMeToAbout">Push me to about</button>
    <button @click="onPushMeToDetail">Push me to detail</button>
    <button @click="onPushMeToOptionalByName">Push me to optionalRoute</button>
    <button @click="onPushMeAboutReplace">onPushMeAboutReplace</button>
  </main>
</template>
