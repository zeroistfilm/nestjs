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

@Entity('web3Login')
export class Web3LoginEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.web3login)
  @JoinColumn({ name: 'userid' })
  userid: UserEntity;

  @Column()
  walletAddress: string;

  @Column()
  walletBalance: number;

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
