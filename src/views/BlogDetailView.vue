<template>
  <BlogHeader></BlogHeader>
  <div class="blog_detail">
    <div class="blog_detail_title">
      <h1>{{ ruleForm.title }}</h1> <el-button type="primary" :icon="Edit" @click="editBlog()" v-show="canEdit" />
    </div>
    <el-divider />
    <div class="blog_detail_description">{{ ruleForm.description }} 创建于{{ ruleForm.created }}</div>
    <el-divider />
    <VMarkdownView :mode="mode" :content="ruleForm.content"></VMarkdownView>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex';

import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import router from '@/router';
import $axios from '@/axios'
import BlogHeader from '@/components/BlogHeader.vue';
const ruleForm = reactive({
  id: '',
  userId: '',
  title: '',
  description: '',
  content: '',
  created: ''
})
const store = useStore()
const blogId = router.currentRoute.value.params.id
const getBlogDetail = (id) => {
  $axios.get('/blog/' + id).then(res => {
    console.log('blog detail', res.data.data)
    ruleForm.id = res.data.data.id
    ruleForm.userId = res.data.data.userId
    console.log('ruleForm id in blog detail', ruleForm.userId)
    ruleForm.title = res.data.data.title
    ruleForm.description = res.data.data.description
    ruleForm.content = res.data.data.content
    ruleForm.created = res.data.data.created
    console.log('store.state.userInfo.id',store.state.userInfo.id)
    if (store.state.userInfo.id === ruleForm.userId) {
      canEdit.value = true
    }
  })
}
getBlogDetail(blogId)
const canEdit = ref(false)
const mode = ref('light')

const editBlog = () => {
  router.push({ name: 'BlogEdit', params: { id: blogId } })
}
</script>


<style scoped>
.blog_detail {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;

  padding: 20px;
  margin-top: 50px;
  background-color: #fff;
}
</style>