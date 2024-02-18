export type TAlarmType = 'server' | 'friend';

export type TYesNo = 'Y' | 'N';

export type TAlarm = {
  alarm_type: TAlarmType,
  title: string,
  detail: string,
  is_check: TYesNo,
}

export type TUserInfoState = {
  token: string,
  email: string,
  name: string,
  nickName: string,
}

export type TAlarmState = {
  badge: number,
  alarmList: TAlarm[],
  requestFriend: number,
}

export type TFriendStatus =
  | 'not_connected'
  | 'request'
  | 'reject'
  | 'becomeFriend';
