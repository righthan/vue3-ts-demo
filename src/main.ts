import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'   // 完整引入(也可以按需引入样式),这里与引用组件不同,不然组件可能没有样式
createApp(App).use(router).mount('#app')
