
import http from './base-api-service';

export const login = (email, password) => http.post('/login', { email, password })

export const register = (user) => http.post('/users', user)

export const logout = () => http.post('/logout')

export const profile = () => http.get('/users/me')

export const userProfile = (userId) => http.get(`/users/${userId}`)