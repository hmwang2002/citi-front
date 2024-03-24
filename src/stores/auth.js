import {defineStore} from 'pinia'

export const userAuthStore = defineStore('auth', {
  state: () => ({
    token: null, // 登录token
    userid: null,
    username: null,
    avatar: null,
    isLoggedIn: false, // 用户登录状态
  }),
  actions: {
    setToken(token) {
      this.token = token;
      this.isLoggedIn = !!token;
    },
    setUserId(userid){
      this.userid = userid;
    },
    setUsername(username){
      this.username = username;
    },
    setAvatar(avatar){
      this.avatar = avatar
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
    },
    getToken(){
      return this.token;
    },
    getUserId(){
      return this.userid;
    },
    getUsername(){
      return this.username;
    },
    getAvatar(){
      return this.avatar;
    }
  }
})