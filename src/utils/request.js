import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://116.198.205.248:8081/', // 配置baseURL指向指定地址
  timeout: 10000, // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'

    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }

    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    console.error('响应错误:', error)
    return Promise.reject(error)
  },
)

export default request
