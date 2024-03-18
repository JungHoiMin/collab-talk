import axiosInstance from "@/apis";
import axios from "axios";

export const getDmList = async () => {
  const res = await axios.get("/chat/dm/list.json");
  return res.data;
};

export const getRoomList = async () => {
  const res = await axios.get("/chat/room/list.json");
  return res.data;
};
