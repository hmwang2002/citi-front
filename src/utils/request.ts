// 引入axios封装
import axios, {type AxiosRequestConfig } from "axios";
import { message } from 'ant-design-vue'
import {SERVER_ADDR, SERVER_NEWS_ADDR} from "@/config";

// 创建axios实例
const request = axios.create({
    baseURL: SERVER_ADDR, // url = base url + request url
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

function request_news(args: AxiosRequestConfig<any>) {
    args.baseURL = SERVER_NEWS_ADDR
    args.timeout = 5000
    args.withCredentials = true
    return axios.request(args)
}


// 导出request
export default request
export {request_news}
