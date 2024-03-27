import axios from "axios";
import axiosInstance from "@/apis";

export const getNotificationList = async () => {
  // const res = await axiosInstance.get("/notification/list");
  // return res.data;
  const res = await axios.get("/notification/list.json");
  return {
    badge: res.data.badge,
    notificationData: res.data.notificationData.map((alarm: any) => {
      const { created_at, ...data } = alarm;
      const strToDate = (str: string) => {
        const yyyy = +str.substring(0, 4);
        const mm = +str.substring(5, 7);
        const dd = +str.substring(8, 10);
        const hh = +str.substring(11, 13);
        const nn = +str.substring(14, 16);
        const ss = +str.substring(17, 19);
        const zzz = +str.substring(20, 23);
        return new Date(yyyy, mm, dd, hh, nn, ss, zzz);
      };
      return {
        ...data,
        created_at: strToDate(created_at),
      };
    }),
  };
};

export const updateNotificationState = async (badge: number, id: string) => {
  // const res = await axiosInstance.patch("/notification/check/", { badge, id });
  // return res.data;
  return true;
};
