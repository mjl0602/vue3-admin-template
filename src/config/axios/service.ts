import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError
} from 'axios'

import qs from 'qs'

import { config } from './config'

import { useRouter } from 'vue-router'

import { ElMessage, resultProps } from 'element-plus'

import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const { wsCache } = useCache()
const { base_url } = config

const router = useRouter()

const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
      'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    // ;(config.headers as AxiosRequestHeaders)['Token'] = 'test test'
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    const token = appStore.getToken || wsCache.get('token');
    if (token) {
      if (!config.headers) config.headers = {}
      config.headers['Authorization'] = 'Bearer ' + token
    }
    console.log('发起请求', config);
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    console.log('请求返回', response);
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (response.data.code === 200) {
      return response.data
    } else if (response.data.code === 401) {
      ElMessage.error(response.data.msg)
      router.replace('/login')
      return response.data;
    } else {
      ElMessage.error(response.data.msg)
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export { service }
