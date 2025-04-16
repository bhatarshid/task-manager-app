import axios from '../utils/axios'

export const createUserAPI = async (data) => axios.post('/users', data)
export const loginUserAPI = async (data) => axios.post('/users/login', data)
export const getProfileAPI = async () => axios.get('/users/me')
export const logoutUserAPI = async () => axios.post('/users/logout')
export const uploadAvatarAPI = async (data) => axios.post('/users/me/avatar', data)
export const updateProfileAPI = async (data) => axios.patch('/users/me', data)
export const deleteAccountAPI = async () => axios.delete('/users/me')