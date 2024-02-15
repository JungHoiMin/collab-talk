import { TFriendStatus } from '../../custom.types';

export class RequestFriendDto {
  requestUUID: string;
  responseUUID: string;
}

export class UpdateFriendDto {
  requestUUID: string;
  responseUUID: string;
  status: TFriendStatus;
}
