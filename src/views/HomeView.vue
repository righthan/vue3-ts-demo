<template>
  <div class="home">
    <el-container>
      <el-header height="60px">
        <el-row align="middle">
          <el-col :span="4"><img src="../assets/logo.png" alt="" class="logo"></el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4"><el-button type="info" @click="handleLogOUt">退出登录</el-button></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- default-active解决刷新之后列表没有颜色标注的问题 -->
          <el-menu active-text-color="#ffd04b" background-color="#545c64" :default-active="acitvePath" text-color="#fff"
            router>
            <!-- 上方router开启路由, 使得组件可以根据index跳转路由-->
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
// 这里需要使用filter,因为直接获取的getRoutes路由当有新的路由时下标可能改变,不宜直接使用下标
const list = router.getRoutes().filter(v => v.meta.isShow);
const route = useRoute();
const acitvePath = route.path

const handleLogOUt = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-header {
  text-align: center;
  background-color: rgb(46, 48, 57);
  color: white;

  .logo {
    height: 50px;
    width: 50px;
    margin-top: 5px;
  }
}

.el-aside {
  .el-menu {
    height: calc(100vh - 60px);
  }
}
</style>