import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  BaseEntity,
  Generated,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Web2LoginEntity } from './web2Login.entity';
import { Web3LoginEntity } from './web3Login.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Generated('uuid')
  @Column()
  userUUID: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  refreshToken?: string;

  @Column()
  accessToken?: string;

  // 유저는 하나의 타입을 가진다
  @Column()
  userType: string;

  @Column()
  status: string;

  @OneToMany(() => Web2LoginEntity, (web2Login) => web2Login.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  web2login: Web2LoginEntity;

  @OneToMany(() => Web3LoginEntity, (web3Login) => web3Login.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  web3login: Web3LoginEntity;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  public updatedAt: Date;
}

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}
