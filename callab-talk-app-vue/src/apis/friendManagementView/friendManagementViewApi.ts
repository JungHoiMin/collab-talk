import axios from "axios";
import axiosInstance from "@/apis";

export const getFriendList = async () => {
  const res = await axios.get(`/friend/list.json`);
  return res.data;
};

export const sendFriendRequestById = async (id: string) => {
  try {
    const res = await axiosInstance.post("/friend/send", { id });
    return res.data;
    // return {
    //   id: "wjddnrgus",
    //   name: "정욱현",
    //   nickName: "정욱현",
    //   imgSource: "/temp/whtjddms.png",
    // };
  } catch (e) {
    return null;
  }
};

export const acceptReceivedFriendRequestById = async (id: string) => {
  try {
    const res = await axiosInstance.patch("/friend/accept", { id });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const addDm = async (id: string) => {
  // const res = await axiosInstance.post("/chat/dm", { id });
  const res = { data: "80810d57-019b-45cd-b791-f1d29e6b115c" };
  return res.data;
};
