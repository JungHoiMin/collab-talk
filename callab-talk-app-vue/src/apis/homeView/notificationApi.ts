import axios from "axios";
import axiosInstance from "@/apis";

export const getNotificationList = async () => {
  // const res = await axiosInstance.get("/notification/list");
  // return res.data;
  const res = await axios.get("/notification/list.json");
  return {
    badge: res.data.badge,
    notificationData: res.data.notificationData.map((alarm: any) => {
      const { strDate, ...data } = alarm;
      return {
        ...data,
        created_at: new Date(strDate),
      };
    }),
  };
};

export const updateNotificationState = async (badge: number, id: string) => {
  // const res = await axiosInstance.patch("/notification/check/", { badge, id });
  // return res.data;
  return true;
};
