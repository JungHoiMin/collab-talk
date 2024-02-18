import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TAlarmType, TYesNo } from '../../custom.types';

@Entity('tbl_alarm')
export class Alarm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  uuid: string;

  @Column('varchar', { nullable: false, default: 'server' })
  alarm_type: TAlarmType;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: false })
  detail: string;

  @Column('varchar', { length: 1, nullable: false, default: 'N' })
  is_check: TYesNo;
}
