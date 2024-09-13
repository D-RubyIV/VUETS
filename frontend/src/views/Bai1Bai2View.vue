<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import Card from "@/components/card/Card.vue";
import ShowMessage from "@/components/ShowMessage.vue";

const showMessageRef = ref(null);

const srcImage = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
const isHandsome = true;
const message = ref("This is a message");
const object = {"count": 1}
const items = [
  {
    name: "Item 1"
  },
  {
    name: "Item 2"
  }
]
onBeforeMount(async () => {
  console.log("onBeforeMount start");
  await sleep(3000);
  // message.value ="00000"
  console.log("onBeforeMount end");
})
onMounted(async () => {
  console.log("onMounted start");
  await sleep(3000);
  // message.value =" 11111"
  console.log("onMounted end");
});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showAlert(message: String) {
  alert("Message: " + message)
}

function onChange() {
  object.count++;
  callChildMethod(object)
}



function callChildMethod(object) {
  console.log(showMessageRef.value.childMethod(object));
}

</script>

<template>
  <div>

    <div>
      <p>V-BIND: </p>
      <img :src="srcImage" alt="" width="100px" height="60px">
    </div>
    <br>
    <p>V-IF: </p>
    <p v-if="isHandsome">Handsome</p>
    <p v-else-if="isHandsome">Unknown</p>
    <p v-else>No</p>
    <br>
    <p>V-MODEL</p>
    <input v-model="message" @onChange="" placeholder="Nhập nội dung">
    <br>
    <p>V-FOR</p>
    <div v-for="(item, index) in items" :key="index">
      <p>{{ item.name }}</p>
    </div>
    <br>
    <p>WATCH</p>
    <ShowMessage ref="showMessageRef" :message="message" :obj="object"></ShowMessage>
    <button @click="onChange">Change Ob</button>


    <br>
    <p>CARD</p>
    <div>
      <Card :action="showAlert" @childMessage="showAlert"></Card>
    </div>


    <el-button type="primary">Primary</el-button>
    <el-button type="primary" :loading="false">Loading</el-button>

  </div>
</template>