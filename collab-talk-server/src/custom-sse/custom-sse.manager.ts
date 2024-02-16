import { Subject } from 'rxjs';
import { SseBadgeDto } from './dto/sse-badge.dto';

export const badgeSubjectSession: Subject<SseBadgeDto> =
  new Subject<SseBadgeDto>();

export const badgeObserver = badgeSubjectSession.asObservable();
