import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectManager } from './entities/connect-manager.entity';
import { Repository } from 'typeorm';
import { badgeSubjectSession } from './custom-sse.manager';

@Injectable()
export class CustomSseService {
  constructor(
    @InjectRepository(ConnectManager)
    private readonly connectManagerRepository: Repository<ConnectManager>,
  ) {}

  async addStream(uuid: string) {
    const isExists = await this.connectManagerRepository
      .createQueryBuilder()
      .where('uuid = :uuid', { uuid })
      .getExists();

    if (!isExists) {
      await this.connectManagerRepository
        .createQueryBuilder()
        .insert()
        .into(ConnectManager)
        .values({ uuid, is_connected: 'Y' })
        .execute();
    } else {
      await this.connectManagerRepository
        .createQueryBuilder()
        .update()
        .set({ is_connected: 'Y' })
        .where('uuid = :uuid', { uuid })
        .execute();
    }
  }

  async removeStream(uuid: string) {
    const isExists = await this.connectManagerRepository
      .createQueryBuilder()
      .where('uuid = :uuid', { uuid })
      .getExists();

    if (isExists) {
      await this.connectManagerRepository
        .createQueryBuilder()
        .update()
        .set({ is_connected: 'N' })
        .where('uuid = :uuid', { uuid })
        .execute();
    }
  }

  async sendSSE(uuid: string, evt: string, body: any) {
    const info = await this.connectManagerRepository
      .createQueryBuilder()
      .select(['badge'])
      .where('uuid = :uuid', { uuid })
      .andWhere('is_connected = :is_connected', { is_connected: 'Y' })
      .getRawOne();
    if (info) {
      await this.connectManagerRepository
        .createQueryBuilder()
        .update()
        .set({ badge: info.badge + 1 })
        .where('uuid = :uuid', { uuid })
        .execute();
      badgeSubjectSession.next({
        evt,
        uuid,
        badge: info.badge + 1,
        body,
      });
    }
  }
}
