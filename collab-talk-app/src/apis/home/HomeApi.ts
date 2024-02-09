import {axiosInstance} from "@apis/AxiosInstance";

export const loadProfileMainImageSource = async () => {
  const result = await axiosInstance.get('/picture/main', { responseType: "blob" })
  return window.URL.createObjectURL(result.data)
}