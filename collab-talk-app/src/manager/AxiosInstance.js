import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  baseURL: 'http://localhost:8080/api/',
  timeout: '1000',
})