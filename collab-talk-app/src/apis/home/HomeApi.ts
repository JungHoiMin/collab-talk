import {axiosInstance} from "@apis/AxiosInstance";

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
  const result = await axiosInstance.get(`/picture/main/${email}`, { responseType: "blob"})
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