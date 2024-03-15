import { defineStore } from "pinia";
import { getDmList, getRoomList } from "@/apis/homeView/homeViewApi";
type TUser = {
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
    setDMList() {
      getDmList().then((data) => {
        this.dmList = data;
      });
    },
    setRoomList() {
      getRoomList().then((data) => {
        this.roomList = data;
      });
    },
  },
});
