import axios from 'axios';

const api = axios.create({
  baseURL: '', // Request paths are relative, proxied by Vite
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
