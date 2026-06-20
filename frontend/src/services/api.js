import axios from "axios";

const api = axios.create({
  baseURL: "https://taskmanager-app-13fv.onrender.com/api",
  withCredentials: true,
});

export default api;
