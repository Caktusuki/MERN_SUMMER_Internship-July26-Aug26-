import axios from 'axios';

const api = axios.create({
  baseURL: '', // Request paths are relative, proxied by Vite
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
