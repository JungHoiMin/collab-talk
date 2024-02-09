import {axiosInstance} from "@apis/AxiosInstance";

export const loadProfileMainImageSource = async () => {
  console.log(axiosInstance.defaults.headers.common)
  const result = await axiosInstance.get('/picture/main', { responseType: "blob" })
  return window.URL.createObjectURL(result.data)
}