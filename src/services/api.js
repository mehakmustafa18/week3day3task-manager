import axios from 'axios'

// ── Base URL ──
const API = axios.create({
  baseURL: 'https://week3day2backend-production.up.railway.app',
})

// ── Auto attach JWT token to every request ──
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Auth APIs ──
export const registerUser = (data) => API.post('/api/users/register', data)
export const loginUser    = (data) => API.post('/api/users/login', data)
export const getProfile   = ()     => API.get('/api/users/profile')

// ── Task APIs ──
export const getTasks    = ()       => API.get('/api/tasks')
export const getStats    = ()       => API.get('/api/tasks/stats')
export const createTask  = (data)   => API.post('/api/tasks', data)
export const updateTask  = (id, data) => API.put(`/api/tasks/${id}`, data)
export const deleteTask  = (id)     => API.delete(`/api/tasks/${id}`)

export default API
