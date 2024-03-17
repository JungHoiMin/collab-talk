import axios from "axios";
import axiosInstance from "@/apis";

export interface IFriend {
  id: string;
  name: string;
  nickName: string;
  imgSource: string;
}

export const getFriendListByNickName = async () => {
  const res = await axios.get(`/friend/list.json`);
  return res.data;
  // else
  //   return res.data.filter(
  //     (data: IFriend) => data.nickName === keyword || data.name === keyword
  //   );
};
