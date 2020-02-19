import axios from 'axios'
import { Notification } from './index'

var service = axios.create({
  timeout: 5000
})
//添加请求拦截器
service.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
//添加响应拦截器
service.interceptors.response.use(
  function(response) {
    const res = response.data
    if (!res.success) {
      Notification.error(res.message)
    }
    return res
  },
  function(error) {
    Notification.error('服务错误！')
    return Promise.reject(error)
  }
)
export default service
