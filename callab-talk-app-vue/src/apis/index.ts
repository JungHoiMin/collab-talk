import axios from "axios";

export const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

export default axiosInstance;
