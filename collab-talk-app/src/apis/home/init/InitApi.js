import {axiosInstance} from "../../AxiosInstance";

export const initProfileImage = async (imageSource) => {
  const data = new FormData();
  data.append('profile_image', imageSource)
  const response = await axiosInstance.post('/picture/upload', data);
  return response.data;
}

export const initProfile = async (nickname, gender) => {
  const data = {nick_name: nickname, gender}
  const response = await axiosInstance.post('/collaborator/init', data);
  return response.data;
}