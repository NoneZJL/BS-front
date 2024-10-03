import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
// import { showFullScreenLoading, tryHideFullScreenLoading } from './serviceHelp'

const baseURL = 'http://localhost:8082'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 关闭loading
    // tryHideFullScreenLoading()
    // TODO 3. 处理业务失败
    if (res.data.code === 0) {
      return res
    }
    // 处理业务失败，给错误提示
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 权限不足或者登录过期
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 错误的默认情况
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
