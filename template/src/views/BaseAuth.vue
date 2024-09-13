<template>
  <div class="grid grid-cols-3 h-full">
    <div class="h-full"
         style="background-image: url('https://as1.ftcdn.net/v2/jpg/05/62/83/14/1000_F_562831491_wY5JB6ePcHVe8GPdC6Z93rMD9CchPSUE.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: left;">
      <div class="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex">
        <div class="logo" style="width: auto;"><img src="https://element-plus.org/images/element-plus-logo.svg"
                                                    alt="Elstar logo"></div>
        <div>
          <div class="mb-6 flex items-center gap-4">
            <span class="avatar avatar-circle avatar-md border-2 border-white">
              <img class="avatar-img avatar-circle" src="" loading="lazy" alt=""></span>
            <div class="text-white">
              <div class="font-semibold text-base">Brittany Hale</div>
              <span class="opacity-80">CTO, Onward</span></div>
          </div>
          <p class="text-lg text-white opacity-80">Elstar comes with a complete set of UI components crafted with
            Tailwind CSS, it fulfilled most of the use case to create modern and beautiful UI and application</p></div>
        <span class="text-white">Copyright © 2024 <span class="font-semibold">Elstar</span> </span></div>
    </div>
    <!---->
    <router-view></router-view>
  </div>

</template>

<script lang="ts" setup>

import SignIn from '@/views/SignIn.vue'
</script>