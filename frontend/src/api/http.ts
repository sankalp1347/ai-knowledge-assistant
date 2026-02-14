import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,  
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
