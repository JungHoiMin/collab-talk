export type TUserInfoState = {
  token: string,
  email: string,
  name: string,
  nickName: string,
}

export type TAlarmState = {
  badge: number,
  requestFriend: number,
}

export type TFriendStatus =
  | 'not_connected'
  | 'request'
  | 'reject'
  | 'becomeFriend';
