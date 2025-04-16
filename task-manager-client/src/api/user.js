import { API } from '../utils/axios'

export const createUserAPI = async (data) => API.post('/users', data)