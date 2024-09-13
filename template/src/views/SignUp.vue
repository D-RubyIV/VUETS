<template>

  <div class="col-span-2 flex items-center justify-center">
    <div style="width: 50%">
      <div class="mb-8"><h3 class="mb-1">Welcome back SIGNUP!</h3>
        <p>Please enter your credentials to sign in!</p></div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="auto"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="ruleForm.username" clearable></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" type="password" clearable></el-input>
        </el-form-item>

        <el-form-item label="Confirm" prop="rePassword">
          <el-input v-model="ruleForm.rePassword" type="password" clearable></el-input>
        </el-form-item>

        <el-form-item label="Age" prop="age">
          <el-input v-model.number="ruleForm.age" type="text" clearable></el-input>
        </el-form-item>

        <el-form-item label="Role" prop="role">
          <el-segmented :options="roleOptions" v-model="ruleForm.role" clearable>

          </el-segmented>
        </el-form-item>

        <el-form-item label="Vip" prop="vip">
          <el-select
            v-model="ruleForm.vip"
            placeholder="Select Vip"
            clearable
          >
            <el-option v-for="(item, index) in vipOptions" :label="item" :key="index" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="State" prop="state">
          <el-radio-group v-model="ruleForm.state">
            <el-radio value="US">US</el-radio>
            <el-radio value="VI">VI</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-button class="w-full" type="primary" @click="onSubmit">Signup</el-button>

      </el-form>
      <div>
        <RouterLink to="signin">
          <p class="text-indigo-600">Đã có tài khoản?</p>
        </RouterLink>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { onBeforeRouteLeave } from 'vue-router'
// Khai bao biến
const roleOptions = ['Developer', 'Manager']
const vipOptions = ['VIP1', 'VIP2']
// TẠO REF
const ruleFormRef = ref<FormInstance>()
// HÀM CHẸCK
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const validateRePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (value !== ruleForm.password) {
      callback(new Error('The password don\'t match'))
    } else {
      callback()
    }
  }
}
// Tạo rule
const ruleForm = reactive({
  username: '',
  password: '',
  rePassword: '',
  state: '',
  age: '',
  role: '',
  vip: ''
})
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: ['blur', 'change'] }],
  password: [{ validator: validatePassword, trigger: ['blur', 'change'] }],
  rePassword: [{ validator: validateRePassword, trigger: ['blur', 'change'] }],
  role: [
    {
      required: true,
      message(a) {
        return 'Please select the role'
      },
      trigger: ['change']
    }
  ],
  state: [
    {
      required: true,
      message(a) {
        return 'Please input the state'
      },
      trigger: ['change']
    }
  ],
  age: [
    {
      required: true,
      message(a) {
        return 'Please input the age'
      },
      trigger: ['change']
    },
    {
      type: 'number',
      message(a) {
        return 'Age mus be a number'
      },
      trigger: ['change']
    }
  ],
  vip: [
    {
      required: true,
      message(a) {
        return 'Please select the vip'
      }
    }
  ]
})
// HÀM SUBMIT
const onSubmit = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
      if (valid) {
        console.log('OK')
        alert('Success')
      } else {
        console.log('FAIL')
      }
    }
  )
}
onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next() // Cho phép điều hướng
  } else {
    next(false) // Ngăn không cho điều hướng
  }
})
</script>