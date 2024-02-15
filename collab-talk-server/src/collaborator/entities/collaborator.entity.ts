import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_collaborator')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('varchar', { length: 320, nullable: false, unique: true })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('varchar', { length: 80, nullable: false })
  name: string;

  @Column('varchar', { length: 150, default: '' })
  nick_name: string;

  @Column('varchar', { length: 11, nullable: false, unique: true })
  phone_number: string;

  @Column('varchar', { length: 1, nullable: true })
  gender: string;

  @Column({ default: 'default' })
  img_main_name: string;

  @Column({ default: 'default' })
  img_background_name: string;

  @CreateDateColumn()
  created_at: Date;
}
