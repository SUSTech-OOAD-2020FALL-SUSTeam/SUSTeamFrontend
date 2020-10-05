import axios from 'axios'
import * as config from './Config'
import { getToken } from '@/utils/Auth'

const request = axios.create({
  baseURL: `${config.HOST}${config.API_BASE}`,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.authorization = token
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
    return Promise.reject(error)
  }
)

export default request
