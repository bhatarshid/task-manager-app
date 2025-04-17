import axios from "../utils/axios";

export const getTasksAPI = async () => axios.get("/tasks")
export const createTaskAPI = async (data) => axios.post('/tasks', data)