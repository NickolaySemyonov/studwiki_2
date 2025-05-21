// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true, // Для отправки кук
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Перехватчик для обработки 401 ошибок
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Можно добавить перенаправление на /login
      console.log('Unauthorized, redirecting...');
    }
    return Promise.reject(error);
  }
);

export default api;