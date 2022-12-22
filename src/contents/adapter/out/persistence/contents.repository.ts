import { Injectable } from '@nestjs/common';
import { ContentsEntity } from './contents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ContentsRepositoryInterface } from '../../../application/port/out/contents.repository.interface';
import { Contents } from '../../../domain/contents.domain';
import { ContentsCategoryRepository } from './contentsCategory.repository';

@Injectable()
export class ContentsRepository { //implements ContentsRepositoryInterface {
  constructor(
    @InjectRepository(ContentsEntity)
    private contentsORMRepository: Repository<ContentsEntity>,
    private contentsCategoryRepository: ContentsCategoryRepository,
  ) {}

  async clear() {
    await this.contentsORMRepository.clear();
  }

  async delete(contentsUUID: string): Promise<DeleteResult> {
    const result = await this.contentsORMRepository.delete(contentsUUID);
    return result;
  }


  readByUUID(contentsUUID: string): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  save(contents: Contents): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  update(contents: Contents): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  async toContentsEntity(contents: Contents): Promise<ContentsEntity> {
    const contentsEntity = new ContentsEntity();
    contentsEntity.title = contents.title;
    contentsEntity.views = contents.views;
    contentsEntity.clicks = contents.clicks;
    contentsEntity.isPublished = contents.isPublished;
    contentsEntity.ownerId = contents.ownerId;
    contentsEntity.rewardCategory = contents.rewardCategory;
    contentsEntity.rewardAmount = contents.rewardAmount;
    contentsEntity.startDate = contents.startDate;
    contentsEntity.endDate = contents.endDate;
    contentsEntity.budget = contents.budget;
    contentsEntity.costPerClick = contents.costPerClick;
    contentsEntity.costPerView = contents.costPerView;
    contentsEntity.costPerConversion = contents.costPerConversion;
    contentsEntity.createdAt = contents.createdAt;
    contentsEntity.updatedAt = contents.updatedAt;

    contentsEntity.category = await this.contentsCategoryRepository.findOneEntity(contents.category.name);
    contentsEntity.description = contents.description;

    return contentsEntity;
  }

  toContentsDomain(contentsEntity: ContentsEntity): Contents {
    return new Contents(
      contentsEntity.UUID,
      contentsEntity.title,
      contentsEntity.views,
      contentsEntity.clicks,
      contentsEntity.isPublished,
      contentsEntity.ownerId,
      contentsEntity.rewardCategory,
      contentsEntity.rewardAmount,
      contentsEntity.startDate,
      contentsEntity.endDate,
      contentsEntity.budget,
      contentsEntity.costPerClick,
      contentsEntity.costPerView,
      contentsEntity.costPerConversion,
      contentsEntity.createdAt,
      contentsEntity.updatedAt,
      contentsEntity.category,
      contentsEntity.description,
      contentsEntity.url,
    );
  }
}
