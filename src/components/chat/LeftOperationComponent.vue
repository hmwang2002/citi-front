<script setup>
import {defineExpose, ref} from "vue";
import {Delete, Expand, Fold, Search} from "@element-plus/icons-vue";
import HistoryItem from "@/components/chat/components/HistoryItem.vue";
import NoChatHistory from "@/assets/chat/no-chat-history.png"
import {ElNotification} from "element-plus";
import {createHistory, deleteHistory, deleteHistoryById, getHistory, searchHistory} from "@/api/chat_manage.ts";
import { userAuthStore } from '@/stores/auth.js'
import {message} from "ant-design-vue";
import axios from "axios";
import {SERVER_GLM_ADDR} from "@/config.ts";

const isSideBarOpen = ref(true);
const scrollRef = ref(null);
const historyList = ref([])
const currentHistoryId = ref(-1)
const currentHistory = ref([])
const searchKeyword = ref("");

// 获取用户id与用户名
const authStore = userAuthStore()
const userId = ref(authStore.getUserId())
const userName = ref(authStore.getUsername())


const emits = defineEmits(['replace-chat','scroll-bottom']);
getHistory(userId.value).then(res => {
  console.log(res.data.data)
  historyList.value = res.data.data
  console.log(historyList.value)
  currentHistoryId.value = res.data.data[0].historyId
  currentHistory.value = res.data.data[0].dialogueList
  emits('replace-chat', [...currentHistory.value], currentHistoryId.value)
})

/**
 * 创建新的对话
 */
const handleCreatedChat = () => {
  // TODO: 向大模型发送请求
  createHistory(userId.value, userName.value, "未命名对话", "", "").then(res => {
    // addChatWithBot(userId.value, res.data.data.historyId).then(resFromBot => {
    //   console.log(resFromBot)
    //   if (resFromBot.status === 201) {
    //     message.warn('新建对话失败')
    //     deleteHistoryById(res.data.data.historyId).then(() => {
    //       console.log("将刚刚后端添加的聊天删除")
    //     })
    //   } else {
    //     searchKeyword.value = ''
    //     currentHistoryId.value = res.data.data.historyId
    //     currentHistory.value = res.data.data.dialogueList
    //     emits('replace-chat', [...currentHistory.value], currentHistoryId.value)
    //     getHistory(userId.value).then(res => {
    //       console.log("重新获取对话list成功")
    //       historyList.value = res.data.data
    //       ElNotification({
    //         message: '新的对话已就绪', type: 'success',
    //       })
    //     })
    //   }
    // })
    let len = historyList.value ? historyList.value.length : 0
    axios.post(SERVER_GLM_ADDR + `/api/add/glm/${userId.value}/${res.data.data.historyId}/${len}`).then(response => {
      console.log(response.status)
      if (response.status === 200) {
        console.log(response.data.message); // 成功创建新的对话窗口
        searchKeyword.value = ''
        currentHistoryId.value = res.data.data.historyId
        currentHistory.value = res.data.data.dialogueList
        emits('replace-chat', [...currentHistory.value], currentHistoryId.value)
        getHistory(userId.value).then(res => {
          console.log("重新获取对话list成功")
          historyList.value = res.data.data
          ElNotification({
            message: '新的对话已就绪', type: 'success',
          })
        })
      } else if (response.status === 201) {
        console.log(response.data.message); // 创建新的对话窗口失败或对话数量已达到最大值
        message.warn('新建对话失败')
        deleteHistoryById(res.data.data.historyId).then(() => {
          console.log("将刚刚后端添加的聊天删除")
        })
      }
    }).catch(error => {
      deleteHistoryById(res.data.data.historyId).then(() => {
        console.log("将刚刚后端添加的聊天删除")
      })
      message.error("大模型响应失败：" + error.message);
    })
  })
}

/**
 * 刷新对话列表
 */
const refreshList = () => {
  getHistory(userId.value).then(res => {
    console.log("重新获取对话list成功")
    historyList.value = res.data.data
    ElNotification({
      message: '对话列表刷新成功', type: 'success',
    })
  })
}

defineExpose({refreshList})

/**
 * 删除指定对话
 */
const handleDeleteChat = (historyId) => {
  console.log(historyId)
  axios.post(SERVER_GLM_ADDR + `/api/delete/glm/${userId.value}/${currentHistoryId.value}`).then(resFromBot => {
    if(resFromBot.status === 200) {
      deleteHistoryById(historyId).then(response => {
        console.log("删除对话，id为：" + historyId + response)
        searchHistory(userId.value, searchKeyword.value).then(res => {
          console.log("重新获取对话list成功")
          historyList.value = res.data.data
          // 如果删除的对话是当前选中的对话，则重置到新列表的第一个对话
          if (historyId === currentHistoryId.value) {
            currentHistoryId.value = res.data.data[0].historyId
            currentHistory.value = res.data.data[0].dialogueList
            emits('replace-chat', [...currentHistory.value], currentHistoryId.value)
            emits('scroll-bottom')
          }
        })
      })
    } else if(resFromBot.status === 201){
      message.error("大模型中删除对话失败")
    }
  }).catch(error => {
    message.error("大模型中删除对话失败:" + error.message)
  })
}

/**
 * 删除全部对话
 */
const handleDeleteAllChat = () => {
  axios.post(SERVER_GLM_ADDR + `/api/delete_all/glm/${userId.value}`).then(resFromGLM => {
    console.log(resFromGLM)
    if(resFromGLM.status === 200){
      deleteHistory(userId.value).then(res => {
        console.log("删除全部历史")
        currentHistoryId.value = -1
        historyList.value = res.data.data
        ElNotification({
          message: '删除全部对话成功', type: 'success',
        })
      })
    } else if(resFromGLM.status === 201){
      message.error("大模型中删除所有对话失败")
    }
  }).catch(error => {
    message.error("大模型中删除所有对话失败:" + error.message)
  })
}

/**
 * 修改历史标题
 */
const handleEditTitle = () => {
  // 子组件发送请求，父组件完成刷新
  searchHistory(userId.value, searchKeyword.value).then(res => {
    console.log("重新获取对话list成功")
    historyList.value = res.data.data
  })
}

/**
 * 查询对话
 */
const handleSearch = () => {
  searchHistory(userId.value, searchKeyword.value).then(res => {
    console.log("搜索对话，关键词为：" + searchKeyword.value)
    historyList.value = res.data.data
  })
}

/**
 * 切换对话
 */
const handleChooseTopic = (historyId) => {
  if (historyId !== currentHistoryId.value) {
    currentHistoryId.value = historyId;
    searchHistory(userId.value, searchKeyword.value).then(res => {
      historyList.value = res.data.data
    })
    for (let i = 0; i < historyList.value.length; i++) {
      console.log("遍历list第:" + historyList.value[i].historyId)
      if(historyList.value[i].historyId === currentHistoryId.value){
        currentHistory.value = historyList.value[i].dialogueList
        break
      }
    }
    console.log("切换到："+ currentHistoryId.value)
    console.log([...currentHistory.value])
    emits('replace-chat', [...currentHistory.value], currentHistoryId.value)
    emits('scroll-bottom')
  }
}

</script>

<template>
  <div v-if="isSideBarOpen" class="left-container-expand">
    <div class="chat-new" @click="handleCreatedChat">
      + 新建对话
    </div>
    <div class="chat-search">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索历史记录"
        :prefix-icon="Search"
        clearable
        @change="handleSearch"
      />
    </div>
    <div class="chat-history">
      <div class="scroll" ref="scrollRef" v-if="historyList && historyList.length > 0">
        <HistoryItem
          v-for="(item) in historyList"
          :key="item.historyId"
          :content="item.historyTitle"
          :time="item.time"
          :is-active="item.historyId === currentHistoryId"
          :id="item.historyId"
          @click="handleChooseTopic(item.historyId); console.log(item.historyId)"
          @delete-chat-by-id="handleDeleteChat(item.historyId)"
          @edit-title="handleEditTitle"
        />
      </div>
      <div class="chat-history-empty" v-else>
        <img class="empty-history-icon" :src=NoChatHistory alt="暂无历史对话"/>
        <div class="empty-history-tip">暂无历史对话</div>
      </div>
    </div>

    <el-divider style="margin: 12px 0 0 0;"/>

    <div class="chat-history-toolbar">
        <span class="clean-history-wrapper" @click="handleDeleteAllChat">
          <el-icon :size="16" color="#9A9A9A"><Delete /></el-icon>
          <span style="margin-left: 12px">清空历史对话</span>
        </span>
      <el-divider direction="vertical" />
      <el-icon :size="20" color="#9A9A9A" @click="isSideBarOpen=false"><Fold /></el-icon>
    </div>
  </div>

  <div v-else class="left-container-fold">
    <div class="expand-icon-wrapper"  @click="isSideBarOpen=true">
      <el-icon :size="20" color="#9A9A9A"><Expand /></el-icon>
    </div>
  </div>
</template>

<style scoped>


.left-container-expand{
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.left-container-fold{
  position: relative;
  width: 3%;
  background-color: #E6F1F8;
  .expand-icon-wrapper{
    height: 40px;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 70%;
    border-radius: 0 90px 90px 0;
    box-shadow: 0 2px 6px 0 #9A9A9A;
  }
}

.chat-new{
  cursor:pointer;
  width: 80%;
  font-size: 16px;
  line-height: 40px;
  margin-top: 20px;
  color: white;
  text-align: center;
  border-radius: 20px;
  background-color: #1877F2;
}

.chat-search{
  width: 80%;
  margin: 12px 0 12px 0;

  .el-input >>> .el-input__wrapper {
    background-color: #F4F4F4;
    border-radius: 20px;
    height: 40px;
    box-shadow: none;
    font-size: 16px;
  }
}

.chat-history{
  width: 80%;
  flex: 1;
  position: relative;
}

.scroll {
  position: absolute;
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.chat-history-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  .empty-history-icon {
    width: 60%;
    padding-left: 14px;
  }
  .empty-history-tip {
    font-size: 16px;
    color: #9A9A9A;
    margin-top: 20px;
  }
}

.chat-history-toolbar{
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-between;
  height: 40px;
  .clean-history-wrapper{
    cursor:pointer;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 14px;
    color: #9A9A9A;
  }
}

</style>
