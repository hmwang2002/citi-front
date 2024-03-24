import axios from "axios";
import {message} from "ant-design-vue";

const request = axios.create({
  baseURL: "", //TODO: url
  timeout: 10000,
})

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
    message.error("大模型响应失败：" + error.message);
    return Promise.reject(error)
  }
)

export function chatWithBot(userId: number, dialogId: number, question: string) {
  return request({
    url: `/api/chat${userId}/ask${dialogId}`,
    method: 'get',
    data: {
      question: question
    }
  });
}

export function addChatWithBot(userId: number, dialogId: number) {
  return request({
    url: `/api/glm${userId}/${dialogId}`,
    method: 'post'
  });
}

export function deleteChatWithBot(userId: number, dialogId: number) {
  return request({
    url: `/api/glm${userId}/${dialogId}`,
    method: 'post'
  });
}

export function feedbackToBot() {
  return request({
    url: `/api/chat/feedback`,
    method: 'post'
  });
}

export function regenerateFromBot(userId: number, dialogId: number) {
  return request({
    url: `/api/chat${userId}/regenerate${dialogId}`,
    method: 'get'
  });
}

export function getTopic(userId: number, dialogId: number) {
  return request({
    url: `/api/chat${userId}/topic${dialogId}`,
    method: 'get'
  });
}
