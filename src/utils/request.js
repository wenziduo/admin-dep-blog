import axios from 'axios'
import { Notification } from './index'

function request({ method, url, data }) {
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
      if (res.returnCode === '000000') {
        window.location.replace('/login')
      }
      return res
    },
    function(error) {
      Notification.error('服务错误！')
      return Promise.reject(error)
    }
  )
  if (method === 'get' || method === 'GET') {
    return service({ method, url, params: data })
  }
  if (method === 'post' || method === 'POST') {
    return service({ method, url, data })
  }
}
export default request
