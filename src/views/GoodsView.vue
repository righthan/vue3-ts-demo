<!-- 商品列表 -->
<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input v-model="selectData.title" placeholder="请输入商品名称" />
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="请输入商品详情" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList.computedList" border style="width: 100%">
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="title" label="名称" width="180" />
            <el-table-column prop="introduce" label="详情" />
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" layout="sizes,prev, pager, next"
            :total="data.selectData.count" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20, 50]" />
    </div>
</template>

<script setup lang="ts">
import { getGoodsList } from '@/request/api';
import { InitData, ListInt } from '@/type/goods';
import { reactive, ref, computed, watch, onMounted } from 'vue';

const data = reactive(new InitData());
const selectData = data.selectData;

const getGoods = () => {
    getGoodsList().then(res => {
        data.list = res.data
        data.selectData.count = res.data.length
    })
}

onMounted(() => {
    getGoods()
})

// 分页器
const currentPage = ref(data.selectData.page);
const pageSize = ref(data.selectData.pageSize);
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
}
const handleSizeChange = (val: number) => {
    pageSize.value = val;
}
const dataList = reactive({
    computedList: computed(() => {
        return data.list.slice(
            (currentPage.value - 1) * pageSize.value,
            currentPage.value * pageSize.value
        )
    })
})


// 查询功能
const onSubmit = function () {
    let arr: ListInt[] = [] // 接受返回的查询数组
    if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
            arr = data.list.filter(value => {
                return value.title.indexOf(data.selectData.title) !== -1;
            })
        }
        if (data.selectData.introduce) {
            arr = data.list.filter(value => {
                return value.introduce.indexOf(data.selectData.introduce) !== -1;
            })
        }
    } else {
        arr = data.list
    }
    data.selectData.count = arr.length;
    data.list = arr
}

// 监听两个查询值的变化,当输入框都为空时将列表恢复为初始的数据(否则将是上次查询的数据)
watch([() => data.selectData.title, () => data.selectData.introduce],
    () => {
        if (data.selectData.title == "" && data.selectData.introduce == "") {
            // 重新获取数据
            getGoods()
        }
    })
</script>

<style scoped>
.el-pagination {
    margin-top: 20px;
}
</style>