import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Interceptor para injetar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_API_TOKEN

  if (token) {
    config.headers.Authorization = token
  }

  return config
})

export default api
