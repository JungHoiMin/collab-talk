import {axiosInstance} from "../../AxiosInstance";

export const initProfileImage = async (imageSource) => {
  const data = new FormData();
  data.append('profile_image', imageSource)
  const response = await axiosInstance.post('/collaborator/init/image', data);
  return response.data;
}