import axios from 'axios';
import { messageConfig } from 'element-plus';
import { ElMessage } from 'element-plus'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8081';

//设置超时时间
axios.defaults.timeout = 5000;

//设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
//前置拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});


//后置拦截器
axios.interceptors.response.use(response => {
    let data = response.data;
    console.log("data.msg is" + data.msg + '拦截器') ;
    if (data.code === 200) {
      return response;
    } else {
        console.log("no error, but data.code is not 200");
        console.log(data);
        ElMessage.error(data.msg);
        //return Promise.reject(data.msg);
    }
  // Do something with response data
},error => {
    //console.log(error);
    if(error.response.status === 401){
        // 清空token信息并跳转到登录页面
        store.commit('removeTokenAndUserInfo')
        // 未登录，跳转登录页面    
        router.push('/login');
        
    } 
    ElMessage.error(error.response.data.msg);
    
})

//请求方法
export default {
  get(url, params) {
    return axios.get(url, {
      params: params
    });
  },
  post(url, data) {
    return axios.post(url, data);
  },
  put(url, data) {
    return axios.put(url, data);
  },
  delete(url, data) {
    return axios.delete(url, {
      data: data
    });
  }
};  