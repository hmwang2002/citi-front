<script setup>
import MessageRow from "@/components/chat/components/MessageRow.vue";
import {defineExpose, nextTick, ref} from "vue";
import {fakeDialogueTipList} from "@/assets/data.js";
import InputComponent from "@/components/chat/components/InputComponent.vue";
import {ArrowRight, Refresh} from "@element-plus/icons-vue";
import logo from "@/assets/logo.png";
import {ElNotification} from "element-plus";
import {regenerate, sendMessage, updateTitle} from "@/api/chat_manage.ts";
import {userAuthStore} from "@/stores/auth.js";
import axios from "axios";
import {message} from "ant-design-vue";
import {SERVER_CHAT_ADDR, SERVER_GLM_ADDR} from "@/config.ts";

//消息列表
const messageList = ref([])
//用户输入内容
const inputText = ref('')
//内容滑块引用
const scrollRef = ref(null)
//滚动标记
const scrollIsLock = ref(false)
//追问提示
const tipList = ref([])
//对话提示
const dialogueTipList = ref([])
// 当前对话id
const currentHistoryId = ref(-1)
// 获取用户id与用户名
const authStore = userAuthStore()
const userId = ref(authStore.getUserId())

const isLoadingAnswer = ref(false)

tipList.value = ['请告诉我更多']
dialogueTipList.value = fakeDialogueTipList

const emits = defineEmits(['refresh-history']);

const updateInputText = (e) => {
    inputText.value = e
}

const handleSendChat = () => {
  if (inputText.value !== ''){
    sendMessage(currentHistoryId.value, inputText.value, true).then(res => {
      console.log("在NO." + currentHistoryId.value + "对话中发送信息：" + inputText.value)
      messageList.value = res.data.data.dialogueList
      nextTickScroll()
      let question = inputText.value
      inputText.value = ''
      isLoadingAnswer.value = true
      const request = axios.create({
        baseURL: SERVER_CHAT_ADDR,
        timeout: 30000,
      })
      request({
        url: SERVER_GLM_ADDR + `/api/chat/${userId.value}/ask${currentHistoryId.value}?question=${question}`,
        method: 'post',
      }).then(res => {
        if(res.status === 200) {
          console.log(res)
          console.log(res.data.answer)
          sendMessage(currentHistoryId.value, res.data.answer, false).then(resFromBackend => {
            console.log("在NO." + currentHistoryId.value + "对话中大模型回复：" + res.data.answer)
            isLoadingAnswer.value = false
            messageList.value = resFromBackend.data.data.dialogueList
            nextTickScroll()
            // =首问获取主题
            console.log("现在有" + messageList.value.length)
            if (messageList.value.length === 2){
              axios.get(SERVER_GLM_ADDR + `/api/chat/${userId.value}/topic${currentHistoryId.value}?question=${question}`).then(response => {
                if(response.status === 200) {
                  console.log("获得生成主题：" + response.data.new_answer)
                  updateTitle(currentHistoryId.value, response.data.new_answer).then(() => {
                    console.log("修改NID：" + currentHistoryId.value + "成功，新标题为：" + response.data.new_answer)
                    emits('refresh-history')
                  })
                } else if(response.status === 201) {
                  message.warn('主题提取失败')
                }
              }).catch(error1 => {
                message.error("获取主题时大模型响应失败：" + error1.message);
              })
            }
          })
        } else if (res.status === 201) {
          isLoadingAnswer.value = false
          message.warn('模型响应失败201')
        }
      }).catch(error2 => {
        isLoadingAnswer.value = false
        message.error("获取回复时大模型响应失败：" + error2.message);
      })
    })
  }
}

const handleScroll = (event) => {
    // 判断滚动方向
    if (event.deltaY < 0) {
        if (!scrollIsLock.value) {
            if (inputText.value) {
                scrollIsLock.value = true
                setTimeout(() => {
                    scrollIsLock.value = false;
                }, 8000); // 延迟8秒后将scrollIsLock.value设置为false
            }
        }
    }
}

const nextTickScroll = () => {
    //滚动一次 注意这里不能使用方法来滚动
    nextTick(() => {
      console.log("这里会滚动一下")
        // scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
    });
}

/**
 * 替换聊天内容
 */
const replaceChatContent = (data, currentHistory) => {
  messageList.value = data
  currentHistoryId.value = currentHistory
}

/**
 * 复制内容
 * @param data
 */
const handleCopyContent = (data) => {
  navigator.clipboard.writeText(data);
  ElNotification({
    message: "复制成功",
    type: "success",
  });
}

/**
 * 重新生成内容
 */
const handleRegenerate = () => {
  isLoadingAnswer.value = true
  axios.get(SERVER_GLM_ADDR + `/api/chat/${userId.value}/regenerate${currentHistoryId.value}?question=${messageList.value[messageList.value.length - 2].content}`).then(response => {
    if(response.status === 200){
      console.log("大模型重新生成：" + response.data.new_answer)
      regenerate(currentHistoryId.value, response.data.new_answer).then(res => {
        console.log("在NO." + currentHistoryId.value + "对话中大模型重新生成：" + response.data.answer)
        isLoadingAnswer.value = false
        messageList.value = res.data.data.dialogueList
      })
    } else if(response.status === 201){
      console.log("大模型重新生成失败")
      regenerate(currentHistoryId.value, "重新生成失败").then(res => {
        console.log("在NO." + currentHistoryId.value + "对话中大模型重新生成失败")
        isLoadingAnswer.value = false
        messageList.value = res.data.data.dialogueList
        message.error("重新生成失败")
      })
    }
  }).catch(error => {
    isLoadingAnswer.value = false
    message.error("重新生成时大模型响应失败：" + error.message);
  })
}


defineExpose({
  replaceChatContent,
  nextTickScroll
})
</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="content-body" ref="scrollRef" @wheel="handleScroll" v-if="messageList.length > 0">
        <MessageRow v-for="(item,index) in messageList"
                    :key="index"
                    :content="item.content"
                    :time="item.time"
                    :is-user="item.isUser"
                    :id="index"
                    @copy="handleCopyContent"/>
        <div class="tip-wrapper" v-if="!messageList[messageList.length - 1].isUser">
          <div class="reload-wrapper">
            <el-icon color="#9A9A9A" size="16px" @click="handleRegenerate"><Refresh /></el-icon>
          </div>
          <div class="tip" @click="updateInputText('请告诉我更多')">
            请告诉我更多
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
        <div class="loading" v-loading="isLoadingAnswer" element-loading-text="Loading..." element-loading-background="transparent" style="height: 100px"/>
      </div>
      <div class="welcome" v-else>
        <img class="chatWhale_logo" :src=logo alt="CHATWHALE"/>
        <h1>你好，我是ChatWhale</h1>
        <div style="margin-top: 12px">我有丰富的股权资料储备，能处理并分析数据信息、理解和生成自然语言，帮助你了解一家公司的股权架构。</div>
        <div style="margin-top: 12px">你可以试着问我：</div>
<!--        <div class="reload-wrapper">-->
<!--          <el-icon><Refresh /></el-icon>-->
<!--        </div>-->
        <div class="dialogue-tip-wrapper">
          <div class="tip-block" v-for="(item, index) of dialogueTipList" :key="index" @click="updateInputText(item.content)">
            <img class="tip-img" :src="item.img" :alt="index">
            <div class="tip-title-content">
              <div class="tip-title">{{item.title}}</div>
              <div class="tip-content">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input-component class="input-wrapper"
                     ref="inputRef"
                     @input="updateInputText"
                     @send="handleSendChat"
                     v-model="inputText"/>
  </div>
</template>

<style scoped>
.container{
  padding: 10px 8% 20px 8%;
  width: 100%;
  background: #E9F2FF;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.content-wrapper{
  width: 100%;
  flex: 1;
  position: relative;
}

.content-body {
  position: absolute;
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
  overflow: auto;
  box-sizing: border-box;
}
.content-body::-webkit-scrollbar {
  display: none;
}

.tip-wrapper {
  cursor:pointer;
  width: 60%;
  margin: 8px 0 0 60px;
  display: flex;
  align-items: center;
  .reload-wrapper {
    margin: 0 8px 0 0;
    height: 36px;
    background: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
  }
  .tip{
    flex: 1;
    height: 36px;
    background-color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    color: #9A9A9A;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.welcome{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chatWhale_logo {
  height: 100px;
  margin-bottom: 12px;
}

.input-wrapper{
  height: 16%;
}

/*.reload-wrapper{*/
/*  width: 40px;*/
/*  height: 30px;*/
/*  background-color: white;*/
/*  align-self: end;*/
/*  margin-right: 110px;*/
/*  margin-bottom: 12px;*/
/*  border-radius: 20px;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*}*/

.dialogue-tip-wrapper{
  display: grid;
  background-color: transparent;
  width: 100%;
  justify-content: center;
  grid-template-columns: 40% 40%;
  grid-gap: 20px;
  grid-template-rows: 100px 100px;
  margin-top: 30px;
}

.tip-block{
  cursor:pointer;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 7px rgb(0 0 0 / 6%);
  display: flex;
  align-items: center;
  .tip-img{
    width: 80px;
    height: 80px;
  }
  .tip-title-content{
    flex: 1;
  }
  .tip-title{
    font-size: 20px;
  }
}
</style>
