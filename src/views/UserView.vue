<!-- 用户列表 -->
<template>
    <div>
        <div>
            <el-form :inline="true" :model="data.selectData">
                <el-form-item label="用户名">
                    <el-input v-model="data.selectData.nickName" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="data.selectData.role" placeholder="请选择角色">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option v-for="item in data.roleList" :label="item.roleName" :value="item.roleId"
                            :key="item.roleId" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="data.list" border style="width: 100%">
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="nickName" label="用户名" width="180" />
            <el-table-column label="角色">
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" :key="item.role" size="small">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column>
                <template #default="scope">
                    <el-button type="primary" link @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog v-model="isShow" title="编辑信息" width="30%" align-center>
        <!-- 编辑表单 -->
        <el-form :model="data.active" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="data.active.nickName" />
            </el-form-item>
            <el-form-item label="角色">
                <el-select multiple v-model="data.active.role" placeholder="请选择角色">
                    <el-option v-for="item in data.roleList" :label="item.roleName" :key="item.roleId"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="isShow = false">
                    确定
                </el-button>
            </span>
        </template>
        <span style="color: red;">未实现具体功能</span>
    </el-dialog>
</template>

<script setup lang="ts">
import { getUserList, getRoleList } from '@/request/api';
import { InitData, ListInt, ActiveInt } from '@/type/user';
import { onMounted, reactive, watch, ref } from 'vue';

const data = reactive(new InitData());
let oldList: ListInt[];
const getUser = () => {
    getUserList().then(res => {
        data.list = res.data
        oldList = res.data
    })
}
const getRole = () => {
    getRoleList().then(res => {
        data.roleList = res.data
    })
}
onMounted(() => {
    getUser();
    getRole();
})

const onSubmit = function () {
    let arr: ListInt[] = [] // 接受返回的查询数组
    if (data.selectData.nickName || data.selectData.role) {
        if (data.selectData.nickName) {
            arr = oldList.filter(value => {
                return value.nickName.indexOf(data.selectData.nickName) !== -1;
            })
        }
        if (data.selectData.role) {
            arr = (data.selectData.nickName ? arr : oldList).filter(value => {
                return value.role.find((item) => item.role === data.selectData.role)
            })
        }
    } else {
        arr = data.list
    }
    data.list = arr

}
// 监听两个查询值的变化,当输入框都为空时将列表恢复为初始的数据(否则将是上次查询的数据)
watch([() => data.selectData.nickName, () => data.selectData.role],
    () => {
        if (data.selectData.nickName == "" && data.selectData.role == 0) {
            // 重新获取数据
            getUser()
        }
    })
const isShow = ref(false);
const handleEdit = function (index: number, row: ListInt) {
    data.active = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((value) => value.role) // 未实现实现具体功能
    }
    isShow.value = true;
}
</script>

<style scoped></style>
