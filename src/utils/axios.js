import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ For sending cookies
});

// Add a request interceptor
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

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors silently
    if (error.response && error.response.status === 401) {
      // Clear token if it exists
      localStorage.removeItem('token');
      // Don't reject the promise, just return a resolved promise with null
      return Promise.resolve({ data: null });
    }
    return Promise.reject(error);
  }
);

export default api;
