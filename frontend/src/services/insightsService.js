import api from './api'

export const fetchEcoTip = () => api.get('/insights/eco-tip').then((res) => res.data)

export const fetchDidYouKnow = () => api.get('/insights/did-you-know').then((res) => res.data)

export const fetchEnvironmentalQuote = () => api.get('/insights/quote').then((res) => res.data)

export const fetchDailyChallenge = () => api.get('/insights/daily-challenge').then((res) => res.data)
