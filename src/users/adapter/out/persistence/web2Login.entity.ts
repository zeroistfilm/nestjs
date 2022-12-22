import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('web2Login')
export class Web2LoginEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.web2login)
  @JoinColumn({ name: 'userid' })
  userid: UserEntity;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  sex: string;

  @Column()
  age: number;

  @Column()
  location: string;

  @Column()
  provider: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  public updatedAt: Date;
}
