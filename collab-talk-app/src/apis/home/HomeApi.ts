import {axiosInstance} from "@apis/AxiosInstance";
import {useAppSelector} from "@hooks/hooks";
import {EventSourcePolyfill} from "event-source-polyfill";

export type TSearchDataForTable = {
  email: string;
  name: string;
  nick_name: string;
  img_main_url: string;
}

export type TSearchData = {
  email: string;
  name: string;
  nick_name: string;
}

export const loadImageSourceByEmail = async (email: string) => {
  const result = await axiosInstance.get(`/picture/main/${email}`, {responseType: "blob"})
  return window.URL.createObjectURL(result.data)
}

export const searchFriends = async (keyword: string): Promise<TSearchDataForTable[]> => {
  const result = await axiosInstance.get(`/collaborator/list/${keyword}`);
  if (result.data) {
    const data: TSearchData[] = result.data;
    return Promise.all(data.map(async (info: TSearchData) => {
      const img_main_url: string = await loadImageSourceByEmail(info.email)
      return {
        ...info,
        img_main_url
      }
    }))
  } else {
    return []
  }
}

export const sendAddFriendByEmail = async (email: string): Promise<void> => {
  const data = {email};
  await axiosInstance.post('/friends/add', data);
}

export const getBadgeConnection = () => {
  const token = sessionStorage.getItem('token') || '';
  const sseConnection = new EventSourcePolyfill(`${axiosInstance.defaults.baseURL}custom-sse`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  sseConnection.onmessage = (ev) => {
    console.log(ev.data);
  };

  return sseConnection;
}