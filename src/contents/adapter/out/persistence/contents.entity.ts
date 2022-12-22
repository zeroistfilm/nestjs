import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';

import { ContentsCategoryEntity } from './contentsCategory.entity';

@Entity('contents')
export class ContentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Generated('uuid')
  UUID: string;

  @Column()
  title: string;
  @Column()
  views: number;
  @Column()
  clicks: number;
  @Column()
  isPublished: boolean;
  @Column()
  ownerId: string;
  @Column()
  rewardCategory: string;
  @Column()
  rewardAmount: number;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  budget: number;
  @Column()
  costPerClick: number;
  @Column()
  costPerView: number;
  @Column()
  costPerConversion: number;
  @Column()
  description: string;

  @Column()
  url: string;

  @ManyToOne(() => ContentsCategoryEntity, (category: ContentsCategoryEntity) => category.contents)
  @JoinColumn({ name: 'categoryId' })
  category: ContentsCategoryEntity;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  public updatedAt: Date;

}
