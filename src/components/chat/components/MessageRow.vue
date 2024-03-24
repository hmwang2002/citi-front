<script setup>
import logo from '@/assets/chat_logo.png'
import like from '@/assets/chat/like.png'
import unlike from '@/assets/chat/unlike.png'
import {DocumentCopy, Refresh, Share} from "@element-plus/icons-vue";
import {userAuthStore} from "@/stores/auth.js";
const props = defineProps({
    content: String,
    time: String,
    isUser: Boolean
})

const emits = defineEmits(['copy']);

// 获取用户信息
const authStore = userAuthStore()
const userAvatar = authStore.getAvatar()
console.log(userAvatar)

//TODO:逐字显示回答
</script>

<template>
  <div :class="['messageRow', isUser ? 'right' : 'left']">
    <div class="info">
      <!--头像-->
      <div class="avatarWrapper">
        <el-avatar v-if="isUser" :src=userAvatar size="40"/>
        <el-avatar v-else size="40" :src="logo" />
      </div>
    </div>
    <!--消息-->
    <div :class="['messageWrapper', isUser ? 'user-message' : 'bot-answer']">
      {{ content }}
      <div class="messageToolWrapper" v-if="!isUser">
        <div class="timeWrapper">
          {{time}}
        </div>
        <img class="like" :src=like alt="like">
        <img class="unlike" :src=unlike alt="unlike">
        <el-divider direction="vertical" />
        <el-icon class="copy" color="#9A9A9A" size="16px" @click="emits('copy', this.content)"><DocumentCopy /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>

.messageRow {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  &.right{
    flex-direction: row-reverse;
    .info {
      justify-content: end;
    }
  }
}

.info{
  display: flex;
}

.messageWrapper{
  max-width: 60%;
  width: fit-content;
  font-size: 16px;
  border-radius: 8px;
  white-space: pre-wrap;
  &.user-message{
    background-color: #1877F2;
    color: #f4f4f4;
    margin: 8px 20px 0 0;
    padding: 8px 12px;
  }
  &.bot-answer{
    background: #ffffff;
    box-shadow: 0 5px 7px rgb(0 0 0 / 6%);
    padding: 8px 12px;
    margin: 8px 0 0 20px;
  }
}

.messageToolWrapper{
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: #9A9A9A;
  font-size: 12px;
  .like, .unlike {
    width: 16px;
    height: 16px;
  }
  .like{
    margin-right: 8px;
  }
  .timeWrapper{
    flex: 1;
  }
}
</style>
