import axios from "../utils/axios";

export const getTasksAPI = async () => axios.get("/tasks")
export const createTaskAPI = async (data) => axios.post('/tasks', data)
export const deleteTaskAPI = async (id) => axios.delete("/tasks/"+id)
export const editTaskAPI = async (data) => axios.patch("/tasks/"+data.id, data)