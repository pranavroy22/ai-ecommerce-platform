import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-ecommerce-platform-2wlp.onrender.com",
});

// 🔥 THIS IS IMPORTANT
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
