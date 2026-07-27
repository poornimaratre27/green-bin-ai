import api from './api'

export const fetchChatHistory = () => api.get('/chat').then((res) => res.data)

export const sendChatMessage = (message) => api.post('/chat', { message }).then((res) => res.data)
