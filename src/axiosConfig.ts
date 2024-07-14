import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Ensure this matches your backend URL
});

// Optional: Add interceptors for handling errors globally
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle 401 errors globally if needed
      console.error('Unauthorized access - possibly invalid or expired token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
