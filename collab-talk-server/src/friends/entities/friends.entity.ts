import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TFriendStatus } from '../../custom.types';

@Entity('tbl_friends')
export class Friends {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  requestUUID: string;

  @Column({ nullable: false })
  responseUUID: string;

  @Column({ nullable: false, default: 'request' })
  status: TFriendStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
