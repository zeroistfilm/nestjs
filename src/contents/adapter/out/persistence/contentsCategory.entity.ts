import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ContentsEntity } from './contents.entity';

@Entity('contentsCategory')
export class ContentsCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @OneToMany(() => ContentsEntity, (contents) => contents.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contents: ContentsEntity;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  public updatedAt: Date;
}
