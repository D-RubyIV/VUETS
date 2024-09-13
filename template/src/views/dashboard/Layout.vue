<script lang="ts" setup>

import SideNavHeader from '@/views/dashboard/SideNavHeader.vue'
</script>
<template>
  <div class="">
    <el-container class="" style="height: 100vh">
      <el-aside width="200px">
        <SideNavHeader></SideNavHeader>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>