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
};

export const requestFriendById = async (id: string) => {
  try {
    const res = await axiosInstance.post("/friend/request", { id });
    return res.data;
    // return {
    //   id: "wjddnrgus",
    //   name: "정욱현",
    //   nickName: "정욱현",
    //   imgSource: "/temp/whtjddms.png",
    // };
  } catch (e) {
    return false;
  }
};

export const addDm = async (id: string) => {
  // const res = await axiosInstance.post("/chat/dm", { id });
  const res = { data: "80810d57-019b-45cd-b791-f1d29e6b115c" };
  return res.data;
};
