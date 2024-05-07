<script setup>
import router from '@/router';
import { User, Lock } from '@element-plus/icons-vue'
import axios from 'axios';
import { ref } from 'vue'
import { useStore } from 'vuex';
//整个用于提交的form数据对象
const formModel = ref({
  username: 'markerhub',
  password: '111111'
})
const store = useStore()
// 整个表单的校验规则
const rules = {
  username: [
    // 非空校验，
    //required表示是否必须输入
    // message表示不满足规则显示的信息
    //trigger：表示显示时机，blur表示是失去焦点，值换成change表示实时
    { required: true, message: '请输入用户名', trigger: 'blur' },
    //长度校验
    { min: 5, max: 10, message: '用户名必须是5-10位字符', trigger: 'blur' }
  ],
  password: [
    //正则表达式校验
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位非空字符',
      trigger: 'blur'
    }
  ]
}

// 表单提交函数
const ruleForm=ref(null)
const resetForm = () => {
  ruleForm.value.resetFields()
}

const submitForm = () => {
  // 调用form的validate方法进行校验
  ruleForm.value.validate((valid) => {
    if (valid) {      
      console.log('submit!!')    
      //ruleForm.value.resetFields()
      console.log(formModel.value)
      axios.post('/login', formModel.value).then(res=>
    {
      console.log(res)
      const jwt = res.headers.getAuthorization();
      const userInfo = res.data.data
      console.log(jwt)
      console.log(userInfo)
      // 把数据共享
      store.commit('setToken', jwt)
      store.commit('setUserInfo', userInfo)

      // 跳转
      router.push('/blogs')
    }).catch(err=>
    {
      console.log("catch error in loginView.vue")
      console.log(JSON.stringify(err))
      // 错误在拦截器中处理
    })
//     {
//     // Wait for the response to be fully available
//     setTimeout(() => {
//         // Extract authorization header from response
//         const authorizationHeader = response.getHeader('authorization');
//         console.log('Authorization Header:', authorizationHeader);

//         // Handle other parts of the response if needed
//         console.log('Response Data:', response.data);
//     }, 0);
// })
    } else {      
      console.log('invalid,error submit!!')  
      console.log(ruleForm.value)    
      return false      
    }        
  })
}
</script>
<template>
<!-- //:model中有着表单数据
//:rulrs中有着校验规则 -->
<el-form
        :model="formModel"
        :rules="rules"
        ref="ruleForm"
        size="large"
        autocomplete="off"
        class="login-form"
        @submit.native.prevent
      >
 
 
        <el-form-item>
          <h1>登录页面</h1>
        </el-form-item>
 
 
<!-- //prop配置的是生效的是哪个规则 -->
        <el-form-item prop="username">
 
<!-- //v-model绑定form具体的数据 -->
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
            name="username"
          ></el-input>
 
        </el-form-item>
 
 
 
        <el-form-item prop="password">
 
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            name="password"
          ></el-input>
 
        </el-form-item>
<el-form-item>  
        <el-button type="primary" @click="submitForm()">登录</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>

 
</el-form>
 
 
</template>

<style scoped>
.login-form {
  max-width: 50%;
  margin: 0 auto;}
</style>
