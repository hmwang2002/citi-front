<script setup>
import { ref } from 'vue'
import backgroundImg from '@/assets/background.jpg'
import { ElNotification } from 'element-plus'

const tab = 'pwd'

</script>

<script>
import { userAuthStore } from '@/stores/auth.js'

export default {
  data() {
    return {
      registerForm: {
        name: '',
        password: '',
        phone: '',
        code: ''
      },
      registerRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 20, message: '用户名长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { len: 11, message: '手机号码应为11位', trigger: 'blur' }
        ],
        code: [
          { require: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码应为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // todo: 更改baseurl
          this.$axios.post(`http://106.54.38.134:8080/user/register`, {
            userName: this.registerForm.name,
            password: this.registerForm.password,
            phone: this.registerForm.phone,
            verifyCode: this.registerForm.code
          })
            .then((response) => {
              const authStore = userAuthStore()
              let code = response.data.code
              if (code === 200) {
                console.log(response.data.message)
                ElNotification({
                  title: 'Success',
                  message: response.data.message,
                  type: 'success'
                })
                // 切换到主页面
                this.$router.push('/login')
              } else if (code === 999) {
                let message = response.data.message
                console.log(message)
                ElNotification({
                  title: 'Error',
                  message: message,
                  type: 'error'
                })

              }
            })
            .catch((err) => {
              console.log('Password register error: ' + err)
            })
        } else {
          console.log('register invalid!')
          ElNotification({
            title: 'Error',
            message: '未填写完整注册信息',
            type: 'error'
          })
        }
      })
    },
    sendCode() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // todo: 更改baseurl
          this.$axios.get(`http://106.54.38.134:8080/sms/send`, {
            params: {
              phone: this.registerForm.phone
            }
          })
            .then((response) => {
              let code = response.data.code
              if (code === 200) {
                console.log(response.data.message)
                ElNotification({
                  title: 'Success',
                  message: response.data.message,
                  type: 'success'
                })
              } else if (code === 999) {
                let message = response.data.message
                console.log(message)
                ElNotification({
                  title: 'Error',
                  message: message,
                  type: 'error'
                })
              }
            })
            .catch((err) => {
              console.log('Send verify code error: ' + err)
            })
        } else {
          console.log('Send verify code invalid!')
          ElNotification({
            title: 'Error',
            message: '未填写完整注册信息',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>


<template>
  <div class="register-wrapper">
    <div class="register-left">
      <el-image :src="backgroundImg" fit="contain" />
    </div>
    <div class="register-right">
      <div class="register-right-title">
        注册
      </div>
      <div class="register-right-card">
        <el-form
          :model="registerForm"
          :rules="registerRules"
          label-width="100px"
          label-position="top"
          ref="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerForm.name" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" show-password />
          </el-form-item>
          <el-form-item label="手机号" prop="name">
            <el-input v-model="registerForm.phone" />
          </el-form-item>
          <el-form-item label="验证码" class="register-right-card-code" prop="name">
            <el-input v-model="registerForm.code" />
          </el-form-item>
          <div class="register-right-card-code-submit" @click="sendCode">
            发送验证码
          </div>
        </el-form>
        <div class="btn-join-register" @click="register">
          注册
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
  display: flex;
  flex-direction: row;
  height: auto;
}

.register-left {
  width: 70%;
}

.register-right {
  width: 30%;
}

.register-right-title {
  width: 100%;
  padding: 10px;
  text-align: center;
}

.register-right-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register-right-card-form {
  text-align: center;
}

.register-right-title {
  font-size: 24px;
}

.btn-join-register {
  width: 30%;
  height: 38px;
  background: #1877f2;
  border-radius: 6px;
  padding: 0 20px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 50px;
}

.register-right-card-code {
  display: inline-block;
}


.register-right-card-code-submit {
  display: inline-block;
  height: 38px;
  background: #1877f2;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 0 5px 0 5px
}

.register-right-card-register {
  display: inline-block;
  padding-right: 20px;
}

.register-right-card-forget {
  display: inline-block;
  padding-left: 20px;
}

.register-right-card-code-submit {
  display: inline-block;
  height: 38px;
  background: #1877f2;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 0 5px 0 5px
}

</style>