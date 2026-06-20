import axios from "axios";

const api = axios.create({
  baseURL: "https://taskmanager-app-v97s.onrender.com",
  withCredentials: true,
});

export default api;
