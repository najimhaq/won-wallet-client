// src/lib/axios-client.ts DS
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const axiosClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔥 Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data?.success) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(
        new Error('Network Error - Please check your internet connection')
      );
    }

    // Server Error
    const serverMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Something went wrong';

    // 401 Unauthorized ->
    if (error.response?.status === 401) {
      console.warn('Session expired. Please login again.');
    }

    return Promise.reject(new Error(serverMessage));
  }
);
