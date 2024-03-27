import { defineStore } from "pinia";
import {
  acceptReceivedFriendRequestById,
  cancelSentFriendRequestById,
  getFriendList,
  isExistsRequestByFriendId,
  rejectReceivedFriendRequestById,
  sendFriendRequestById,
  TRequestFriendType,
} from "@/apis/friendManagementView/friendManagementViewApi";
import { useNotificationStore } from "@/store/useNotificationStore";

export type TFriend = {
  id: string;
  nickName: string;
  imgSource: string;
};

export type TFriendRequest = TFriend & {
  requested_at: Date;
};

export type TFriendState = {
  isLoad: boolean;
  friendList: TFriend[];
  receivedFriendRequestList: TFriendRequest[];
  sentFriendRequestList: TFriendRequest[];
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
      (state) => async (type: TRequestFriendType, friendId: string) => {
        if (type === "friend") {
          return (
            state.friendList.findIndex((value) => value.id === friendId) !== -1
          );
        } else {
          return await isExistsRequestByFriendId(type, friendId);
        }
      },
  },
  actions: {
    async loadFriendList() {
      if (!this.isLoad) {
        const data = await getFriendList();
        if (data) {
          const notificationStore = useNotificationStore();

          this.isLoad = true;
          this.friendList = data.friendList;
          this.sentFriendRequestList =
            data.sentFriendRequest.sentFriendRequestList;
          this.receivedFriendRequestList =
            data.receivedFriendRequest.receivedFriendRequestList;

          notificationStore.receivedFriendRequestBadge =
            data.receivedFriendRequest.badge;
          return true;
        }
      }
      return false;
    },
    async acceptReceivedFriendRequest(requestId: string) {
      const friend: TFriend | null = await acceptReceivedFriendRequestById(
        requestId
      );
      if (friend) {
        this.friendList.push(friend);
        this.receivedFriendRequestList = this.receivedFriendRequestList.filter(
          (value) => value.id !== requestId
        );
      }
      return true;
    },
    rejectReceivedFriendRequest(requestId: string) {
      rejectReceivedFriendRequestById(requestId).then(() => {
        this.receivedFriendRequestList = this.receivedFriendRequestList.filter(
          (value) => value.id !== requestId
        );

        const notificationStore = useNotificationStore();
        if (notificationStore.receivedFriendRequestBadge)
          notificationStore.receivedFriendRequestBadge--;
      });
    },
    async sendFriendRequest(friendId: string) {
      const request: TFriendRequest | null = await sendFriendRequestById(
        friendId
      );
      if (request) {
        this.sentFriendRequestList.push(request);
        return true;
      } else {
        return false;
      }
    },
    cancelSentFriendRequest(requestId: string) {
      cancelSentFriendRequestById(requestId).then(() => {
        this.sentFriendRequestList = this.sentFriendRequestList.filter(
          (value) => value.id !== requestId
        );
      });
    },
  },
});
