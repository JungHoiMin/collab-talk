import axios from "axios";
import axiosInstance from "@/apis";
import { TFriend, TFriendRequest } from "@/store/useFriendStore";

export type TRequestFriendType = "friend" | "received" | "sent";

export const getFriendList = async () => {
  const res = await axios.get(`/friend/list.json`);
  return res.data;
};

export const sendFriendRequestById = async (
  friendId: string
): Promise<TFriendRequest | null> => {
  try {
    const res = await axiosInstance.post("/friend/send", { friendId });
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
export const cancelSentFriendRequestById = async (
  requestId: string
): Promise<void> => {
  await axiosInstance.delete(`/friend/cancel/${requestId}`);
  return;
};

export const acceptReceivedFriendRequestById = async (
  requestId: string
): Promise<TFriend | null> => {
  try {
    const res = await axiosInstance.patch("/friend/accept", { requestId });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const rejectReceivedFriendRequestById = async (
  requestId: string
): Promise<void> => {
  await axiosInstance.patch("/friend/reject", { requestId });
  return;
};

export const isExistsRequestByFriendId = async (
  type: TRequestFriendType,
  friendId: string
): Promise<boolean> => {
  try {
    const res = await axiosInstance.get(
      `/friend/request?type=${type}&id=${friendId}`
    );
    return res.data;
  } catch (e) {
    return false;
  }
};

export const addDm = async (id: string) => {
  // const res = await axiosInstance.post("/chat/dm", { id });
  const res = { data: "80810d57-019b-45cd-b791-f1d29e6b115c" };
  return res.data;
};
