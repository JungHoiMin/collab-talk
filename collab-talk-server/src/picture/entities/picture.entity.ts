import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_picture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  uuid: string;

  @Column('varchar', { nullable: false })
  image_file_name: string;

  @CreateDateColumn()
  registered_at: Date;
}
