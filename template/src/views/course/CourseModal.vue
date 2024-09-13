<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue'

const props = defineProps({
  object: {
    type: Object as PropType<Course | Record<string, unknown>>,  // Sử dụng Record<string, unknown> thay cho {}
    required: true
  },
  action: String
});

const ruleForm: Course|Record<string, unknown> = reactive(props.object)

const emits = defineEmits(['onCloseModal'])


</script>
<template>
  <div
    style="position: fixed; z-index: 10; width: 40%; background-color: white; padding: 10px; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); top: 50%; left: 50%; transform: translate(-50%, -50%)">
    <div>
      <div style="display: flex; justify-content: end">
        <el-button @click="()=>{emits('onCloseModal')}">Close</el-button>
      </div>
      <div>
        <el-form
          label-width="auto"
        >
          <el-form-item label="code: " prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>

          <el-form-item label="description: " prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item label="status: " prop="status">
            <el-input v-model="ruleForm.status"></el-input>
          </el-form-item>

          <el-form-item label="title: " prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>

          <el-form-item label="createdDate: " prop="createdDate">
            <el-input v-model="ruleForm.createdDate"></el-input>
          </el-form-item>

          <el-form-item label="updateDate: " prop="updateDate">
            <el-input v-model="ruleForm.updateDate"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>