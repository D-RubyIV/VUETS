<template>

  <div class="col-span-2 flex items-center justify-center">
    <div style="width: 50%">
      <div class="mb-8"><h3 class="mb-1">Welcome back SIGNIN!</h3>
        <p>Please enter your credentials to sign in!</p></div>
      <el-form
        :model="ruleForm"
        ref="ruleFormRef"
        :rules="rules"
        label-width="auto"
      >

        <el-form-item label="Username: " prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>

        <el-form-item label="Password: " prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>

        <el-button class="w-full" type="primary" @click="submitForm(ruleFormRef)">Signin</el-button>

      </el-form>
      <div>
        <RouterLink to="signup">
          <p class="text-indigo-600">Bạn chưa có tài khoản?</p>
        </RouterLink>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { inject, provide, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { onBeforeRouteLeave } from 'vue-router'
import { authenticatedUsers, type User } from '@/stores/users'
import router from '@/router'

const globalState: any = inject('globalState')

// TẠO REF
const ruleFormRef = ref<FormInstance>()

// HÀM CHECK VALIDATE
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const handleIsLogin = (username: string, password: string) => {
  const user: User = authenticatedUsers.filter(s => s.username === username)[0]
  console.log(user)
  if (user.password === password) {
    globalState.isAuthenticated = true
    return true
  } else {
    return false
  }
}
// TẠO RULE
const ruleForm = reactive({
  username: '',
  password: ''
})
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [
    { validator: validatePass, trigger: 'blur' }
  ]
})
// HÀM SUBMIT
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('Validate SUCCESS')
      const isLogin = handleIsLogin(ruleForm.username, ruleForm.password)
      if (isLogin) {
        alert('Đăng nhập thành công')
        router.push("/dashboard")
      } else {
        alert('Sai tài khoản hoặc mật khẩu')
      }
    } else {
      console.log('Validate FAIL')
    }
  })
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