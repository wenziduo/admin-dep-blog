import axios from 'axios'
import { notification } from 'antd'

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
      notification.error({
        message: '错误提示',
        description: res.message
      })
    }
    return res
  },
  function(error) {
    notification.error({
      message: '错误提示',
      description: '服务错误！'
    })
    return Promise.reject(error)
  }
)
export default service
