import { defineStore } from "pinia";
import {
  acceptReceivedFriendRequestById,
  getFriendList,
  sendFriendRequestById,
} from "@/apis/friendManagementView/friendManagementViewApi";

export type TFriend = {
  id: string;
  name: string;
  nickName: string;
  imgSource: string;
};

export type TFriendState = {
  isLoad: boolean;
  friendList: TFriend[];
  receivedFriendRequestList: TFriend[];
  sentFriendRequestList: TFriend[];
};

export const useFriendStore = defineStore("friendStore", {
  state: (): TFriendState => ({
    isLoad: false,
    friendList: [],
    receivedFriendRequestList: [],
    sentFriendRequestList: [],
  }),
  getters: {
    isAlreadyExisting:
      (state) => (type: "friend" | "received" | "sent", id: string) => {
        let list: TFriend[];
        switch (type) {
          case "friend":
            list = state.friendList;
            break;
          case "received":
            list = state.receivedFriendRequestList;
            break;
          case "sent":
            list = state.sentFriendRequestList;
            break;
        }
        const idx = list.findIndex((value) => value.id === id);
        return idx !== -1;
      },
  },
  actions: {
    async loadFriendList() {
      if (!this.isLoad) {
        const data = await getFriendList();
        if (data) {
          this.isLoad = true;
          this.friendList = data.friendList;
          this.sentFriendRequestList = data.sentFriendRequestList;
          this.receivedFriendRequestList = data.receivedFriendRequestList;
          return true;
        }
      }
      return false;
    },
    async acceptReceivedFriendRequest(id: string) {
      // TODO::서버에 요청
      const friend: TFriend | null = await acceptReceivedFriendRequestById(id);
      if (friend) {
        this.friendList.push(friend);
        this.receivedFriendRequestList = this.receivedFriendRequestList.filter(
          (value) => value.id !== id
        );
      }
      return true;
    },
    async sendFriendRequest(id: string) {
      const friend: TFriend | null = await sendFriendRequestById(id);
      if (friend) {
        this.sentFriendRequestList.push(friend);
        return true;
      } else {
        return false;
      }
    },
  },
});
