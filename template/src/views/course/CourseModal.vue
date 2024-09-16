<script setup lang="ts">
import {type PropType, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { instance } from '@/axios/customaxios'

const props = defineProps({
  object: {
    type: Object as PropType<Course | Record<string, unknown>>,  // Sử dụng Record<string, unknown> thay cho {}
    required: true
  },
  action: {
    type: String,
    required: true
  },
  isOpenModal: {
    type: Boolean,
    required: true
  }
})
const isDisable = ref(false)
const emits = defineEmits(['onCloseModal', 'fetchAllAgain'])

watch(() => props.action, (newValue, oldValue) => {
  if (newValue === 'DETAIL') {
    isDisable.value = true
  } else {
    isDisable.value = false
  }
}, { immediate: true })


const onSubmitCreate = async () => {
  const bool = await isValidateForm()
  console.log(bool)
  if (bool) {
    try {
      await instance.post(`courses`, props.object, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function(r) {
        emits('fetchAllAgain')
        emits('onCloseModal')
      })
    } catch (error) {
      console.error('Error fetching course details:', error)
    }
  }
}
const onSubmitDelete = async () => {
  try {
    await instance.delete(`courses/${props.object?.id}`)
      .then(function(r) {
        emits('fetchAllAgain')
        emits('onCloseModal')
      })
  } catch (error) {
    console.error('Error fetching course details:', error)
  }
}
const onSubmitUpdate = async () => {
  try {
    await instance.put(`courses/${props.object?.id}`, props.object, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function(r) {
      emits('fetchAllAgain')
      emits('onCloseModal')
    })
  } catch (error) {
    console.error('Error fetching course details:', error)
  }
}

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof props.object>>({
  code: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '' || value === undefined) {
          callback(new Error('Please input the code'))
        } else if (value.length < 4 || value.length > 8) {
          callback(new Error(`code từ 4 -> 8 kí tự`))
        }
        callback()
      },
      trigger: ['change']
    }
  ],
  title: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '' || value === undefined) {
          callback(new Error('Please input the title'))
        } else if (value.length < 5 || value.length > 50) {
          callback(new Error(`code từ 5 -> 50 kí tự`))
        }
        callback()
      },
      trigger: ['change']
    }
  ],
  status: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '' || value === undefined) {
          callback(new Error('Please input the status'))
        }
        callback()
      },
      trigger: ['change']
    }
  ],
  description: [
    {
      required: true,
      validator(rule, value, callback, source, options) {
        if (value === '' || value === undefined) {
          callback(new Error('Please input the description'))
        } else if (value.length < 5 || value.length > 50) {
          callback(new Error(`code từ 5 -> 50 kí tự`))
        }
        callback()
      },
      trigger: ['change']
    }
  ]
})

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    (props.object as Course).file = file
  }
}

const isValidateForm = async () => {
  if (!ruleFormRef.value) return
  return ruleFormRef.value.validate((valid) => {
    if (valid) {
      console.log('Validate SUCCESS')
    } else {
      console.log('Validate FAIL')
    }
  })
}

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
          ref="ruleFormRef"
          :model="object"
          :rules="rules"
          label-width="auto"
        >
          <el-form-item label="code: " prop="code">
            <el-input :disabled="isDisable" v-model="(object as Course).code"></el-input>
          </el-form-item>

          <el-form-item label="description: " prop="description">
            <el-input :disabled="isDisable" v-model="(object as Course).description"></el-input>
          </el-form-item>

          <el-form-item label="status: " prop="status">
            <el-select
              :disabled="isDisable"
              v-model="(object as Course).status"
              placeholder="Select Status"
              clearable
            >
              <el-option label="Active" :value=1 />
              <el-option label="In Active" :value=0 />
            </el-select>
          </el-form-item>

          <el-form-item label="title: " prop="title">
            <el-input :disabled="isDisable" v-model="(object as Course).title"></el-input>
          </el-form-item>

          <el-form-item label="createdDate: " prop="createdDate" v-if="action!== 'CREATE' && action !== 'UPDATE'">
            <el-input :disabled="isDisable" v-model="(object as Course).createdDate"></el-input>
          </el-form-item>

          <el-form-item label="updateDate: " prop="updateDate" v-if="action!== 'CREATE' && action !== 'UPDATE'">
            <el-input :disabled="isDisable" v-model="(object as Course).updateDate"></el-input>
          </el-form-item>

          <el-form-item label="file: " v-if="action=== 'CREATE' || action === 'UPDATE'">
            <input type="file" @change="handleFileChange" />
          </el-form-item>

          <div v-if="action==='DETAIL'">
            <img :src="object.image == null ? 'https://th.bing.com/th/id/OIP.LMpRbJQ6cFXFjBeX2pcddQAAAA?w=217&h=216&c=7&r=0&o=5&pid=1.7' : `http://localhost:8080/api/v1/file/${object.image}`" alt="" width="100px">
          </div>

          <el-form-item>
            <el-button v-if="action==='CREATE'" @click="onSubmitCreate">Create</el-button>
            <el-button v-if="action==='UPDATE'" @click="onSubmitUpdate">Update</el-button>
            <el-button v-if="action==='DELETE'" @click="onSubmitDelete">Delete</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>