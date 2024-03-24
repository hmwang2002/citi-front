import {createStore} from 'vuex'

export default createStore({
    state:{
        //用户数据
        userInfo: undefined,
        isLoggedIn: false,
        token: "hi"
    },
    getters:{
        userInfo: (state) => state.userInfox
    },
    mutation:{
        setUserInfo(state, info) {
            state.userInfo = info;
            localStorage.setItem("userInfo", JSON.stringify(info));
        },
        setLoginState(state, isLoggedIn){
            state.isLoggedIn = isLoggedIn
        },
        setToken(state, token){
            state.token = token
        }
    },
    actions: {},
    modules: {}
})
