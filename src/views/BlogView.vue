<template>
    <BlogHeader></BlogHeader>
    <!-- 显示用户信息 -->
  <el-timeline style="max-width: 600px">
    <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogList">
      <el-card>
        <h4>
            <router-link :to="{name: 'BlogDetail',params: {id: blog.id}}">{{ blog.title }}</router-link>
            </h4>
        <p>{{ blog.description }}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  <el-pagination class = "m_page" background layout="prev, pager, next" :total=total :page-size=pageSize :current-page.sync=current @current-change="page" />
</template>


<script setup>
// 导入组件
import BlogHeader from '../components/BlogHeader.vue'
import {ref,reactive} from 'vue'       // 导入ref和reactive
import axios from 'axios'
const current = ref(1);
const blogList = ref([]);
const pageSize = ref(5);
const total = ref(0);
// 监听currentPage变化，请求数据
// 定义数据
function page(currentPage){
    axios.get('/blogs?currentPage='+currentPage).then(res=>
    {
        console.log(res.data.data)
         blogList.value = res.data.data.records;
         total.value = res.data.data.total;      // 总条数
         console.log("blog list:",blogList.value[0])
         pageSize.value = res.data.data.size; // 每页条数
         current.value = res.data.data.current; // 当前页
        
    }).catch(err=>console.log(err))
}
page(current.value)



</script>

<style scoped>
.m_page {
  margin: 0 auto;
  text-align: center;

}
</style>