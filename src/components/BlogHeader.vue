<template>
        <h1>欢迎来到我的博客</h1>
        <div class="block">
                <el-avatar :size="50" :src="userInfo.squareUrl" />
                <div class="username">{{ userInfo.username }}</div>
        </div>
        <div class="actions">
                <span><el-link type="info" href="/blogs">主页</el-link></span>
                <el-divider direction="vertical" />
                <span><el-link type="success" href="/blog/add">发表文章</el-link></span>
                <el-divider direction="vertical" border-style="dashed" />

                <span><el-link type="primary" v-show="!store.state.token" @click="login">登录</el-link></span>

                <span><el-link type="danger" v-show="store.state.token" @click="logout">退出</el-link></span>

        </div>

</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex';
import router from '@/router';
const store = useStore()
const username = ref('请先登录')
const squareUrl = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
const userInfo = reactive({ username, squareUrl })
function logout() {
        axios.get('/logout', {
                headers:
                        { "Authorization": localStorage.getItem("token") }
        }).then(res => {

                store.commit('removeTokenAndUserInfo')
                router.push('/login')

        })
}
function login() {
        router.push('/login')
}
// 页面创建时调用，获取用户信息
const dealWithUserInfo = () => {
        // 用户信息不为空，显示用户名和头像
        if (store.state.userInfo && store.state.userInfo.username) {
                userInfo.username = store.state.userInfo.username
                userInfo.squareUrl = store.state.userInfo.avatar
        }


}
dealWithUserInfo()      
</script>
<style scoped>
.actions {
        display: flex;
        justify-content: center;
        margin-top: 10px;
}
</style>