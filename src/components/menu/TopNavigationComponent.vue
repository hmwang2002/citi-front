<script setup>
import { ref } from 'vue'
import store from '@/stores'
import AuthDialogComponent from '@/components/auth/AuthDialogComponent.vue'
import logoSrc from '@/assets/chat_logo.png'
import { useRouter } from 'vue-router'
import { userAuthStore } from '@/stores/auth.js'

//导航默认active
let activeItem = ref('main')

//用户登录状态
const authStore = userAuthStore()

//登录框可见性
const authDialogIsVisible = ref(true)
const productDialogIsVisible = ref(false)
const isFullScreen = ref(false)
const router = useRouter()
const handleCloseDialog = () => {
  authDialogIsVisible.value = false
}

const changeAuthVisiblity = () => {
  authDialogIsVisible.value = !authDialogIsVisible.value
  console.log(authDialogIsVisible.value)
}

const goToMain = () => {
  activeItem.value = 'main'
  router.push('/')
}

const goToChat = () => {
  activeItem.value = 'chat'
  router.push('/chat')
}

const goToSearch = () => {
  activeItem.value = 'search'
  router.push('/search')
}

const goToNews = () => {
  activeItem.value = 'news'
  router.push('/news')
}

const goToLogin = () => {
  router.push('/login')
}

const userAvatar = authStore.getAvatar()

</script>

<template>
  <div class="container">
    <div class="flex-wrapper">
      <div class="flex-wrapper-model">
        <div class="topic-wrapper">
          <div class="topic-wrapper-pic">
            <el-image :src="logoSrc" style="width: 30px; height: 30px;" fit="cover" />
          </div>
          <div class="topic-wrapper-text">
            ChatWhale
          </div>
        </div>

        <div class="top-menu">
          <div :class="{'top-menu-item-active': activeItem === 'main', 'top-menu-item': activeItem !== 'main'}"
               @click="goToMain">
            页面
          </div>
          <div :class="{'top-menu-item-active': activeItem === 'chat', 'top-menu-item': activeItem !== 'chat'}"
               @click="goToChat">
            股权问答
          </div>
          <div :class="{'top-menu-item-active': activeItem === 'search', 'top-menu-item': activeItem !== 'search'}"
               @click="goToSearch">
            股权查询
          </div>
          <div :class="{'top-menu-item-active': activeItem === 'news', 'top-menu-item': activeItem !== 'news'}"
               @click="goToNews">
            新闻资讯
          </div>
        </div>

        <div class="user-info" v-if="authStore.isLoggedIn">

          <el-popover
            :width="250"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
          >
            <template #reference>
              <el-avatar class="user-info-avatar" :src="authStore.getAvatar()" size="40" />
            </template>
            <template #default>
              <div
                class="demo-rich-conent"
                style="display: flex; gap: 16px; flex-direction: column"
              >
                <el-avatar
                  :size="60"
                  :src="authStore.getAvatar()"
                  style="margin-bottom: 8px"
                />
                <div>
                  <p
                    class="demo-rich-content__name"
                    style="margin: 0; font-weight: 500"
                  >
                    {{authStore.getUsername()}}
                  </p>
                  <p
                    class="demo-rich-content__mention"
                    style="margin: 0; font-size: 14px; color: var(--el-color-info)"
                  >
                    @南信证券
                  </p>
                </div>

                <p class="demo-rich-content__desc" style="margin: 0">
                  钻石级会员,提问查询次数不限，可查询上市公司具体信息与股权架构图。
                </p>
              </div>
            </template>
          </el-popover>

        </div>
        <div class="btn-join-login" @click="goToLogin" v-else>
          登录
        </div>

      </div>
    </div>
  </div>

  <!--  <auth-dialog-component :is-visible="authDialogIsVisible" @close-dialog-event="handleCloseDialog"/>-->
</template>

<style scoped>
.container {
  width: 100%;

}

.flex-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-wrapper-model {
  background-color: white;
  padding: 5px 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topic-wrapper {
  display: flex;
  flex-direction: row;
}

.topic-wrapper-pic {
  padding: 0px 20px;
}

.topic-wrapper-text {
  font-size: 18px;
  padding-right: 60px;
}

.top-menu {
  display: flex;
  flex-direction: row;
  margin-right: auto;
}

.top-menu-item {
  width: 120px;
  padding: 5px 20px;
  margin: 2px;
  font-size: 18px;
  text-align: center;
}

.top-menu-item:hover {
  width: 120px;
  padding: 5px 20px;
  margin: 2px;
  font-size: 18px;
  text-align: center;
  border-bottom: 2px solid #1877f2;
  transition: all 0.2s ease;
}

.top-menu-item-active {
  width: 120px;
  padding: 5px 20px;
  margin: 2px;
  font-size: 18px;
  text-align: center;
  color: #1877f2;
  border-bottom: 2px solid #1877f2;
  transition: all 0.2s ease;
}

.btn-join-login {
  width: 80px;
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
}

.user-info {
  padding: 10px;
}

.user-info-avatar{
  display: inline-block;
  margin: 0 15px 0 15px;
}

.user-info-name{
  text-align: center;
  align-content: center;
  align-items: center;
  display: inline-block;
  margin: 0 10px 0 10px;
}

</style>
