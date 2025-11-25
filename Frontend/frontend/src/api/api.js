import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/'
})

// attach token header 'token' from localStorage (keeps simple)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers['token'] = token
  return config
})

// if 401 or invalid token, clear auth and redirect to login
API.interceptors.response.use(
  res => res,
  err => {
    if (err.response && (err.response.status === 401 || (err.response.data && err.response.data.status === 'error' && err.response.data.error === 'Invalid Token'))) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

export default API
