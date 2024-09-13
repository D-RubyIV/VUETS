<script lang="ts" setup>
import CustomerTable from "@/components/table/CustomerTable.vue";
import CarouselView from "@/components/carousel/CarouselView.vue";
import ButtonView from "@/components/button/ButtonView.vue";
import { ref } from 'vue';

const name = ref("John Doe")
const input = ref('');
const selectMode = ref(1); // Dùng ref để theo dõi sự thay đổi của selectMode
</script>

<template>
  <div>
    <div>
      <form style="display: flex; gap: 20px">
        <div>
          <input type="radio" :value="1" v-model="selectMode" name="option1" id="option1">
          <label for="option1">Input 1</label>
        </div>
        <div>
          <input type="radio" :value="2" v-model="selectMode" name="option1" id="option2">
          <label for="option2">Input 2</label>
        </div>
        <div>
          <input type="radio" :value="3" v-model="selectMode" name="option1" id="option3">
          <label for="option3">Input 3</label>
        </div>
      </form>
    </div>
    <!-- DISPLAY -->
    <div v-if="selectMode === 1">
      <el-input v-model="name" clearable style="width: 200px"/>
      <p>My Name is {{name}}</p>
    </div>
    <div v-else-if="selectMode === 2">
      <ButtonView></ButtonView>
    </div>
    <div v-else>
      <CarouselView></CarouselView>
    </div>
  </div>
</template>
