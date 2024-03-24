import axios from "axios";
import {SERVER_CHAT_ADDR} from "@/config";
import {message} from "ant-design-vue";

const request = axios.create({
  baseURL: SERVER_CHAT_ADDR, // url = base url + request url
  timeout: 10000,
})

// 请求拦截器 一般写法模式
request.interceptors.request.use(
  (response) => {
    return response // 请求成功则返回response
  },
  (error) => { // 请求失败则显示错误状态
    message.error(error.message)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

// 后端-新建对话
export function createHistory(userId: number, userName: string, historyTitle: string, firstQuestion: string, firstAnswer: string){
  return request({
    url: '/chat/createHistory',
    method: 'post',
    data: {
      userId: userId,
      userName: userName,
      historyTitle: historyTitle,
      firstQuestion: firstQuestion,
      firstAnswer: firstAnswer,
    }
  })
}

// 后端-删除对话
export function deleteHistoryById(historyId: number) {
  return request({
    url: '/chat/deleteById',
    method: 'get',
    params: {
      id: historyId,
    }
  })
}

// 后端-删除所有对话
export function deleteHistory(userId: number) {
  return request({
    url: '/chat/deleteAll',
    method: 'post',
    params: {
      id: userId,
    }
  })
}

// 后端-修改历史记录标题
export function updateTitle(historyId: number, newTitle: string){
  return request({
    url: '/chat/updateTitle',
    method: 'post',
    params: {
      historyId: historyId,
      newTitle: newTitle,
    }
  })
}

// 后端-查询历史对话
export function searchHistory(userId: number, keywords: string) {
  return request({
    url: '/chat/query',
    method: 'get',
    params: {
      userId: userId,
      keywords: keywords,
    }
  })
}

// 后端-获取对话
export function getHistory(userId: number) {
  return request({
    url: '/chat/findAllByUserId',
    method: 'get',
    params: {
      userId: userId,
    }
  })
}


// 后端-重新生成
export function regenerate(historyId: number, content: string) {
  return request({
    url: '/chat/regenerate',
    method: 'post',
    data: {
      historyId: historyId,
      content: content,
      isUser: false,
    }
  })
}

// 后端-发送消息
export function sendMessage(historyId: number, content: string, isUser: boolean) {
  return request({
    url: '/chat/addDialogue',
    method: 'post',
    data: {
      historyId: historyId,
      content: content,
      isUser: isUser,
    }
  })
}
