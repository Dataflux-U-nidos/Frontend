import axios from 'axios';

export const userApi = axios.create({

  // Using the environment variable for the backend URL
  baseURL: import.meta.env.VITE_BACKEND_URL,
  
});
