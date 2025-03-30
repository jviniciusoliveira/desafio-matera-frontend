import axios, { type InternalAxiosRequestConfig } from 'axios'
import { USER_STORAGE_KEY } from '@/providers/AuthProvider'

const BASE_URL = 'https://67ddc6fd471aaaa7428282c2.mockapi.io/api/v1'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

function setAuthorizationHeader(request: InternalAxiosRequestConfig) {
  const user = localStorage.getItem(USER_STORAGE_KEY)

  if (user && request.headers) {
    const parsedUser = JSON.parse(user)
    request.headers.Authorization = parsedUser.token
  }

  return request
}

axiosInstance.interceptors.request.use(setAuthorizationHeader)

export const httpClient = axiosInstance
