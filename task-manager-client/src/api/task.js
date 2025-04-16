import axios from "../utils/axios";

export const getTasksAPI = async () => axios.get("/tasks");