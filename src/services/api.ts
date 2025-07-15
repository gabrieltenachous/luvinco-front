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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn('Token inválido ou ausente.');
    }

    return Promise.reject(error)
  }
)

export default api
