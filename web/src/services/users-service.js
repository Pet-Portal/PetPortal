
import http from './base-api-service';

const login = (email, password) => http.post('/login', { email, password })

const register = (user) => http.post('/users', user)

const logout = () => http.post('/logout')

const profile = () => http.get('/users/me')

const userProfile = (userId) => http.get(`/users/${userId}`)

const update = (userId, user) => http.patch(`/users/${userId}`, user)

const service = {
    login,
    register,
    logout,
    profile,
    userProfile,
    update
}

export default service;