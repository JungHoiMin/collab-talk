import { defineStore } from "pinia";
import {
  getNotificationList,
  updateNotificationState,
} from "@/apis/homeView/notificationApi";

export type TNotification = {
  id: string;
  checked: boolean;
  type: "friend" | "notice";
  title: string;
  description: string;
  created_at: Date;
  data: object;
};

export type TNotificationState = {
  badge: number;
  receivedFriendRequestBadge?: number;
  notificationData: TNotification[];
};

export const useNotificationStore = defineStore("notificationStore", {
  state: (): TNotificationState => ({
    badge: 0,
    receivedFriendRequestBadge: 0,
    notificationData: [],
  }),
  actions: {
    loadNotificationList() {
      getNotificationList().then((data: TNotificationState) => {
        this.badge = data.badge;
        this.notificationData = data.notificationData;
        console.log(data);
      });
    },
    checkNotification(id: string) {
      const notification = this.notificationData.find(
        (data: TNotification) => data.id === id
      );
      if (notification) {
        updateNotificationState(this.badge, id).then(() => {
          this.badge--;
          notification.checked = true;
        });
      }
    },
  },
});
