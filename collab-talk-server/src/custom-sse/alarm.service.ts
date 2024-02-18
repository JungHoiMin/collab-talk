import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
  ) {}

  async getAlarmListByUUID(uuid: string) {
    return await this.alarmRepository
      .createQueryBuilder()
      .select(['alarm_type', 'title', 'detail', 'is_check'])
      .where('uuid = :uuid', { uuid })
      .orderBy('id', 'DESC')
      .getRawMany();
  }
}
