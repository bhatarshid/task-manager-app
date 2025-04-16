import axios from '../utils/axios'

export const createUserAPI = async (data) => axios.post('/users', data)
export const loginUserAPI = async (data) => axios.post('/users/login', data)