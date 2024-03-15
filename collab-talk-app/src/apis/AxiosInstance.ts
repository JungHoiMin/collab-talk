import axios from "axios";

export const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }else{
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

export const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  baseURL: 'http://19.19.20.49:8080/api/',
  timeout: 1000,
})