import axios from 'axios'
import * as config from './Config'
import { getToken } from '@/utils/Auth'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: `${config.HOST}${config.API_BASE}`,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response.data
    } else {
      return Promise.reject(response.data.error)
    }
  },
  error => {
    if (error?.response?.data?.success === false) {
      message.error(error.response.data.error)
      return Promise.reject(error.response.data.error)
    }
    return Promise.reject(error)
  }
)

export default request
