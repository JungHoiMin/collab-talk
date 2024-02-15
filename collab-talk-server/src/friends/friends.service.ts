import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friends } from './entities/friends.entity';
import { Repository } from 'typeorm';
import { RequestFriendDto } from './dto/change-status-friends.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,
  ) {}
  async requestFriend(data: RequestFriendDto) {
    try {
      await this.friendsRepository
        .createQueryBuilder()
        .insert()
        .into(Friends)
        .values(data)
        .execute();
      return 'Ok';
    } catch (err) {
      return err;
    }
  }
}
