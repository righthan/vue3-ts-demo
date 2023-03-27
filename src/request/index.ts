// 词文件用于封装axios
import axios from 'axios'
// 创建axios实例
const service = axios.create({
    baseURL: 'https://mock.presstime.cn/mock/6409687af4c9304d2a97bcf5/api',
    timeout: 5000, // 超时时间
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})
// 请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})
// 响应拦截
service.interceptors.response.use((res) => {
    // 状态码
    const code: number = res.status

    if (code != 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    console.log("失败");
    console.log(err);
})

export default service