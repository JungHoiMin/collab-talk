import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TYesNo } from '../../custom.types';

@Entity('tbl_connect_manager')
export class ConnectManager {
  @PrimaryColumn()
  uuid: string;

  @Column('varchar', { length: 1, nullable: false, default: 'N' })
  is_connected: TYesNo;

  @Column('int', { nullable: false, default: 0 })
  badge: number;
}
