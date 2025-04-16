import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.10:8080/api/user', // Replace with YOUR local IP
  timeout: 5000,
});

export default api;
