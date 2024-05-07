<template>
    <BlogHeader></BlogHeader>
    <div class="m-content">博客编辑</div>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" />
        </el-form-item>

        <el-form-item label="摘要" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <VMarkdownEditor v-model="ruleForm.content" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">
                立即创建
            </el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import BlogHeader from '@/components/BlogHeader.vue';
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { VMarkdownEditor } from 'vue3-markdown'

import 'vue3-markdown/dist/style.css'
import router from '@/router';
// import { ru } from 'element-plus/es/locale';


const formSize = ref('default')
const ruleFormRef = ref() // 表单组件实例，ref创建的响应式引用
const ruleForm = reactive({
    id: '',
    title: '',
    description: '',
    content: '',
    created: '',
})  //存储表达数据

// 表单验证规则
const rules = reactive({
    title: [
        { required: true, message: '请输入博客标题', trigger: 'blur' },
        { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' },
    ],

    description: [
        { required: true, message: '请输入博客摘要', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入博客内容', trigger: 'blur' },
    ],
})

// 提交表单
const submitForm = async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
            ruleForm.created = ''
            console.log('submit!', ruleForm.created)
            axios.post('/blog/edit', ruleForm, {
                headers:
                    { "Authorization": localStorage.getItem("token") }
            }
            ).then((res) => {
                console.log(res)
                const open = () => {
                    ElMessageBox.alert('操作成功', '提示', {
                        // if you want to disable its autofocus
                        // autofocus: false,
                        confirmButtonText: '确定',
                        callback: action => {
                            router.push('/blogs')

                        },
                    })
                }
                open()
            }).catch((err) => {
                console.error("错误", err)
            })
            //ElMessage.success('创建成功')

        } else {
            console.error('error submit!', fields)
            ElMessage.error('Error in form submission')
        }
    })
}
// 重置表单
const resetForm = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
      // 重置响应式对象的属性
  Object.keys(ruleForm).forEach(key => {
    ruleForm[key] = '';
  });
}

// 获取博客详情
const getBlogDetail = async (id) => {
    if (!id) return
    const res = await axios.get('/blog/' + id).then((res) => {
        const resData = res.data.data
        Object.assign(ruleForm, resData)

    }).catch((err) => { console.error(err) })

}

// 页面加载时获取博客详情
getBlogDetail(router.currentRoute.value.params.id)


</script>

<style scoped>
.m-content {
    text-align: center;
    margin-top: 50px;
}
</style>