<script lang="ts" setup>
import {ref} from "vue";

const message = ref("my message")

defineProps({
  name: {
    type: String,
    default: "OK"
  },
  action: {
    type: Function,
    required: true
  }
})

const emit = defineEmits();

function sendMessage() {
  emit('childMessage', 'Hello from child!' + " " + message.value);
}
</script>
<template>
  <div>
    <p>{{name}}</p>
    <div>
      <input v-model="message">
    </div>
    <button @click="sendMessage">Show Alert From Child</button>
    <button @click="action('from parent')">Show Alert from Parent</button>
  </div>
</template>