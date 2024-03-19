import { defineStore } from "pinia";
import { getDmList, getRoomList } from "@/apis/homeView/homeViewApi";
import { addDm } from "@/apis/friendManagementView/friendManagementViewApi";
export type TUser = {
  id: string;
  name: string;
  imgSource?: string;
};

type TDM = {
  id: string;
  user: TUser;
  badge: number;
};

type TRoom = {
  id: string;
  name: string;
  imgSource?: string;
  userList: TUser[];
  badge: number;
};

type TChatRoomList = {
  dmList: TDM[];
  roomList: TRoom[];
};

export const useChatRoomStore = defineStore("chatRoomStore", {
  state: (): TChatRoomList => ({
    dmList: [],
    roomList: [],
  }),
  actions: {
    loadDmList() {
      getDmList().then((data) => {
        this.dmList = data;
      });
    },
    loadRoomList() {
      getRoomList().then((data) => {
        this.roomList = data;
      });
    },
    async addNewDM(user: TUser) {
      const uuid = await addDm(user.id);
      this.dmList.push({
        id: uuid,
        user: user,
        badge: 0,
      });
      return uuid;
    },
  },
});
