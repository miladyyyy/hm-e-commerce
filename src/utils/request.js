import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://weldon.net.cn:8889/api',
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { token } = store.state.user
  if (token) config.headers.Authorization = token

  return config
})

//响应拦截器
request.interceptors.response.use(
  function (response) {
    if (response.data.meta.status === 200) return response.data

    if (response.data.meta.status === 400) {
      Message.error(response.data.meta.msg)
      return Promise.reject()
    }
  },
  function (error) {
    Message.error(error?.response?.data?.message || '系统错误')
    return Promise.reject(error)
  }
  // function (error) {
  //   if (error.response.status === 401) {
  //     store.commit('user/removeToken')
  //     router.push('/login')
  //     Message.warning('登录过期，请重新登录')
  //   } else {
  //     Message.error(error?.response?.data?.message || '系统错误')
  //   }
  //   return Promise.reject(error)
  // }
)

export default request
