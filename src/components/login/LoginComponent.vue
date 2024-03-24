<script setup>
import { ref } from 'vue'
import backgroundImg from '@/assets/background.jpg'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const tab = 'pwd'
const router = useRouter()
const goToRegister = () => {
  router.push('/register')
}
</script>

<script>
import { userAuthStore } from '@/stores/auth.js'

export default {
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      phoneForm: {
        number: '',
        code: ''
      },
      config: {}
      ,
      loginRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 20, message: '用户名长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      phoneRules: {
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
    getUserInfo() {
      this.$axios.get('http://106.54.38.134:8080/user/getUserInfo', {
        headers: {
          'satoken': userAuthStore().token
        }
      }).then((response) => {
        const authStore = userAuthStore()
        let code = response.data.code
        if (code === 200) {
          console.log(response.data)
          authStore.setUsername(response.data.data.userName)
          authStore.setAvatar(response.data.data.avatar)
        } else if (code === 999) {
          let message = response.data.response
          console.log(message)
          console.log(userAuthStore().token)
        }
      }).catch((err) => {
        console.log(err)
      })

    },
    pwdLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // todo: 更改baseurl
          this.$axios.get(`http://106.54.38.134:8080/user/login`, {
            params: {
              userName: this.loginForm.name,
              password: this.loginForm.password
            }
          })
            .then((response) => {
              const authStore = userAuthStore()
              let code = response.data.code
              if (code === 200) {
                console.log(response.data)
                console.log(response.data.message)
                let token = response.data.data.tokenValue
                let userId = response.data.data.loginId
                authStore.setToken(token)
                authStore.setUserId(userId)
                this.getUserInfo()
                // 切换到主页面
                this.$router.push('/chat')
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
              console.log('Password Login error: ' + err)
            })
        } else {
          console.log('login invalid!')
        }
      })

    },
    phoneLogin() {
      this.$ref.phoneForm.validate((valid) => {
        if (valid) {
          // todo: 更改baseurl
          this.$axios.get('http://106.54.38.134:8080/user/loginByPhone', {
            params: {
              phone: this.phoneForm.number,
              verifyCode: this.phoneForm.code
            }
          })
            .then((response) => {
              const authStore = userAuthStore()
              let code = response.data.code
              if (code === 200) {
                console.log(response.data.message)
                let token = response.data.data.tokenValue
                authStore.setToken(token)
                this.$router.push('/chat')
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
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-left">
      <el-image :src="backgroundImg" fit="contain" />
    </div>
    <div class="login-right">
      <div class="login-right-title">
        登录
      </div>
      <div class="login-right-card">
        <el-tabs @tab-click="handleClick" class="login-right-card-form" v-model="tab">
          <el-tab-pane label="用户名密码登录" name="pwd">
            <el-form
              :model="loginForm"
              :rules="loginRules"
              label-width="60px"
              label-position="top"
              ref="loginForm"
            >
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" show-password />
              </el-form-item>
            </el-form>
            <div class="login-right-card-register" @click="goToRegister">
              立即注册
            </div>
            <div class="login-right-card-forget">
              忘记密码？
            </div>
            <div class="btn-join-login" @click="pwdLogin">
              登录
            </div>
          </el-tab-pane>
          <el-tab-pane label="手机验证码登录" name="phone">
            <el-form
              :model="phoneForm"
              :rules="phoneRules"
              ref="phoneForm"
              label-width="60px"
              label-position="top"
            >
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="phoneForm.number" />
              </el-form-item>
              <el-form-item label="验证码" class="login-right-card-code" prop="code">
                <el-input v-model="phoneForm.code" />
              </el-form-item>
              <div class="login-right-card-code-submit">
                发送验证码
              </div>
            </el-form>
            <div class="btn-join-login" @click="phoneLogin">
              登录
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: row;
  height: auto;
}

.login-left {
  width: 70%;
}

.login-right {
  width: 30%;
}

.login-right-title {
  width: 100%;
  padding: 10px;
  text-align: center;
}

.login-right-card {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-right-card-form {
  text-align: center;
}

.login-right-title {
  font-size: 24px;
}

.btn-join-login {
  width: 40%;
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
  margin-left: 30%;
}

.login-right-card-code {
  display: inline-block;
}


.login-right-card-code-submit {
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

.login-right-card-register {
  display: inline-block;
  padding-right: 20px;
}

.login-right-card-forget {
  display: inline-block;
  padding-left: 20px;
}

</style>
