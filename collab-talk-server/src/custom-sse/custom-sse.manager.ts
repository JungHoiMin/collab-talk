import { Subject } from 'rxjs';
import { ConnectInfoDto } from './dto/connect-info.dto';

export const userSubjectSession: Subject<ConnectInfoDto> =
  new Subject<ConnectInfoDto>();

export const observer = userSubjectSession.asObservable();
