import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friends } from './entities/friends.entity';
import { Repository } from 'typeorm';
import { RequestFriendDto } from './dto/change-status-friends.dto';
import { from } from 'rxjs';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,
  ) {}
  async requestFriend(data: RequestFriendDto) {
    try {
      if (
        !(await this.friendsRepository
          .createQueryBuilder()
          .where(
            'requestUUID = :requestUUID and responseUUID = :responseUUID',
            data,
          )
          .orWhere(
            'requestUUID = :responseUUID and responseUUID = :requestUUID',
            data,
          )
          .getExists())
      ) {
        await this.friendsRepository
          .createQueryBuilder()
          .insert()
          .into(Friends)
          .values(data)
          .execute();
      }
      return 'Ok';
    } catch (err) {
      return err;
    }
  }

  async getFriendStatus(UUID1: string, UUID2: string) {
    const result = await this.friendsRepository
      .createQueryBuilder()
      .select(['status'])
      .where('requestUUID = :UUID1 and responseUUID = :UUID2', { UUID1, UUID2 })
      .orWhere('requestUUID = :UUID2 and responseUUID = :UUID1', {
        UUID1,
        UUID2,
      })
      .getRawOne();

    return result ? result.status : 'not_connected';
  }
}
