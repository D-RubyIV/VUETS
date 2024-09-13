<script lang="ts" setup>

import { onMounted, type PropType, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { Energy } from '@/views/env/index'


const props = defineProps(
  {
    itemsExisting: {
      type: Array as PropType<Energy[]>,
      required: true
    }
  }
)


const listValue = ref<number[]>([])

function validateValue() {
  listValue.value = []
  props.itemsExisting?.forEach(s => {
      listValue.value.push(s.min)
      listValue.value.push(s.max)
    }
  )
  listValue.value.sort((a, b) => a - b)
  console.log(listValue.value)
  return checkAAA(listValue.value, parseInt(ruleForm.min), parseInt(ruleForm.max))
}

function checkAAA(listNumbers: number[], min: number, max: number): boolean {
  let status = true
  for (let i = -1; i < listNumbers.length; i++) {
    let f = 0
    let s = 0
    console.log(i)
    if (i === -1) {
      f = 0
      s = listNumbers[0]
    }  else if (i + 1 === listNumbers.length) {
      f = listNumbers[i]
      s = 1000000000
    } else {
      f = listNumbers[i]
      s = listNumbers[i + 1]
    }
    console.log(min, '>', f, min > f)
    console.log(max, '<', s, max < s)
    console.log('--------')
    if(min === 0){
      if (min >= f && max < s) {
        console.log('OK 1')
        return true
      } else {
        console.log('NOT OK 1')
        status = false
      }
    }
    else{
      if (min > f && max < s) {
        console.log('OK 2')
        return true
      } else {
        console.log('NOT OK 2')
        status = false
      }
    }

  }
  return status
}

const maxLength = 10
const ruleForm = reactive({
  name: '',
  code: '',
  min: '',
  max: '',
  price: ''
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<typeof ruleForm>>({
  name: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '') {
          callback(new Error('Please input the name'))
        }
        if (value.length > maxLength) {
          callback(new Error(`Tên mã không quá ${maxLength} kí tự`))
        }

        callback()
      },
      trigger: []
    }
  ],
  code: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '') {
          callback(new Error('Please input the code'))
        }
        if (props.itemsExisting.find(s => s.code === value) != undefined) {
          callback(new Error(`Mã đã tồn tại`))
        }
        if (value.length > maxLength) {
          callback(new Error(`code không quá ${maxLength} kí tự`))
        } else {
          callback()
        }
      },
      trigger: []
    }
  ],
  min: [
    {
      required: true,
      validator(rule, value, callback, source, options) {

        if (value === '') {
          callback(new Error('Please input the min'))
        }
        // if (!validateValue()) {
        //   callback(new Error('min max not valid'))
        // }
        if (value.length > maxLength) {
          callback(new Error(`code không quá ${maxLength} kí tự`))
        } else {
          callback()
        }
      },
      trigger: []
    }
  ],
  max: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '') {
          callback(new Error('Please input the max'))
        }
        if (!validateValue()) {
          callback(new Error('min max not valid'))
        }
        if (value.length > maxLength) {
          callback(new Error(`code không quá ${maxLength} kí tự`))
        } else {
          callback()
        }
      },
      trigger: []
    }
  ],
  price: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '') {
          callback(new Error('Please input the price'))
        }
        if (value.length > maxLength) {
          callback(new Error(`code không quá ${maxLength} kí tự`))
        } else {
          callback()
        }
      },
      trigger: []
    }
  ]
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm)
      emit('create', ruleForm)
      emit('close')
      console.log('Validate SUCCESS')
    } else {
      console.log('Validate FAIL')
    }
  })
}
const emit = defineEmits(['close', 'create'])

</script>
<template>
  <div
    style="position: fixed; z-index: 10; width: 40%; background-color: white; padding: 10px; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); top: 50%; left: 50%; transform: translate(-50%, -50%)">
    <div>
      <el-button @click="() => { emit('close')}">Close</el-button>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="Name: " prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="code: " prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>

      <el-form-item label="min: " prop="min">
        <el-input v-model="ruleForm.min"></el-input>
      </el-form-item>

      <el-form-item label="max: " prop="max">
        <el-input v-model="ruleForm.max"></el-input>
      </el-form-item>

      <el-form-item label="price: " prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="submitForm(ruleFormRef)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>