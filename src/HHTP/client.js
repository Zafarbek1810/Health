import axios from "axios";
import Message from "../utils/Message";

export const API_URL = "http://45.95.234.56/api";

const client = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

client.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config;
})
client.interceptors.response.use((config) => {
  return config;
}, (error) => {
  if (error?.response?.status === 401) {
    Message.unauthorizedError();
    localStorage.removeItem("token");
    return Promise.reject(error);
  }
  return Promise.reject(error);
})

export default client;
