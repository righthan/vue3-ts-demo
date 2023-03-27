<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <h2>后台管理系统</h2>
            <el-form-item label="账号:" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)" class="login-btn">登录</el-button>
                <el-button @click="resetForm(ruleFormRef)" class="login-btn">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { LoginForm } from '@/type/login';
import { login } from '../request/api';
import { useRouter } from 'vue-router';

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const ruleForm: LoginForm = reactive({
    username: '',
    password: '',

})

const rules = reactive<FormRules>({
    username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
    },
    { min: 3, max: 10, message: '用户名长度在3-10个字符', trigger: 'blur' },
    ],
    password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    },
    { min: 5, max: 10, message: '密码长度在5-10个字符', trigger: 'blur' }
    ]
})
// 登录
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            login(ruleForm).then((res) => {
                // 保存token
                localStorage.setItem('token', res.data.token)
                router.push('/')
            })
            router.push('/')
        } else {
            console.log('error submit!')
            return false
        }
    })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.png");
    text-align: center;
    overflow-x: hidden;

    .demo-ruleForm {
        margin: 200px auto;
        width: 500px;
        padding: 40px;
        background-color: white;
        border-radius: 10px;
    }

    .login-btn {
        width: 48%;
    }

    h2 {
        margin-bottom: 10px;
    }
}
</style>