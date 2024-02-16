import {axiosInstance} from "@apis/AxiosInstance";
import {getSseConnection} from "@apis/SseInstance";
import {TFriendStatus} from "@typings/states";

export type TSearchDataForTable = {
  email: string;
  name: string;
  nick_name: string;
  img_main_url: string;
  status: TFriendStatus;
}

export type TSearchData = {
  email: string;
  name: string;
  nick_name: string;
  status: TFriendStatus;
}

export const loadImageSourceByEmail = async (email: string) => {
  const result = await axiosInstance.get(`/picture/main/${email}`, {responseType: "blob"})
  return window.URL.createObjectURL(result.data)
}

export const getFriendStatusByEmail = async (email: string) => {
  const result = await axiosInstance.get(`/friends/status/${email}`)
  return result.data
}

export const searchFriends = async (keyword: string): Promise<TSearchDataForTable[]> => {
  const result = await axiosInstance.get(`/collaborator/list/${keyword}`);
  if (result.data) {
    const data: TSearchData[] = result.data;
    return Promise.all(data.map(async (info: TSearchData) => {
      const img_main_url: string = await loadImageSourceByEmail(info.email)
      const status: string = await getFriendStatusByEmail(info.email)
      return {
        ...info,
        img_main_url,
        status: status as TFriendStatus,
      }
    }))
  } else {
    return []
  }
}

export const sendAddFriendByEmail = async (email: string): Promise<boolean> => {
  const data = {email};
  const result = await axiosInstance.post('/friends/add', data);
  return result.data === 'Ok'
}

export const getBadgeConnection = () => {
  return getSseConnection('badge');
}