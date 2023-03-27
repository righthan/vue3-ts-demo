<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="open">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data.list" border style="width: 100%">
      <el-table-column prop="roleId" label="Id" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column label="修改权限">
        <template #default="scope">
          <el-button type="primary" link @click="handleEdit(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getRoleList } from '@/request/api';
import { InitData, ListInt } from '@/type/role';
import { ElMessage, ElMessageBox, roleTypes } from 'element-plus';
import { useRouter } from "vue-router";

const router = useRouter();

const open = () => {
  ElMessageBox.prompt('添加角色', {
    confirmButtonText: '添加',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      // 实际需要向后端请求,这里简单实现....
      data.list.push({ roleName: value, roleId: 3, authority: [] })
      ElMessage({
        type: 'success',
        message: `添加角色:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消添加',
      })
    })
}
const data = reactive(new InitData());
onMounted(() => {
  getRoleList().then(res => {

    data.list = res.data

  })
})

const handleEdit = function (row: ListInt) {
  router.push({
    name: 'authority',
    state: {
      id: row.roleId,
      authority: row.authority
    }
  }
  )
  router.beforeEach(async to => {
    to.meta.data = {
      id: row.roleId,
      authority: row.authority
    }
  })
  router.push({
    name: 'authority'
  })
}
</script>

<style scoped></style>