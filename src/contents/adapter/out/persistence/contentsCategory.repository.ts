import { Injectable } from '@nestjs/common';
import { ContentsCategoryRepositoryInterface } from '../../../application/port/out/contentsCategort.repository.interface';
import { ContentsCategoryEntity } from './contentsCategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ContentsCategory } from '../../../domain/ContentsCategory.domain';

@Injectable()
export class ContentsCategoryRepository implements ContentsCategoryRepositoryInterface {
  constructor(
    @InjectRepository(ContentsCategoryEntity)
    private contentsCategoryORMRepository: Repository<ContentsCategoryEntity>,
  ) {}

  async clear(): Promise<void> {
    await this.contentsCategoryORMRepository.clear();
  }

  delete(contentsCategoryUUID: string): Promise<DeleteResult> {
    return this.contentsCategoryORMRepository.delete(contentsCategoryUUID);
  }

  async findOne(categoryName: string): Promise<ContentsCategory> {
    const contentsCategoryEntity: ContentsCategoryEntity = await this.contentsCategoryORMRepository.findOneBy({
      name: categoryName,
    });
    return this.toContentsCategoryDomain(contentsCategoryEntity);
  }

  async findOneEntity(categoryName: string): Promise<ContentsCategoryEntity> {
    return await this.contentsCategoryORMRepository.findOneBy({
      name: categoryName,
    });
  }

  save(contentsCategory: ContentsCategory): Promise<ContentsCategory> {
    const contentsCategoryEntity = this.toContentsCategoryEntity(contentsCategory);
    return this.contentsCategoryORMRepository.save(contentsCategoryEntity);
  }

  update(contentsCategory: ContentsCategory): Promise<UpdateResult> {
    const contentsCategoryEntity = this.toContentsCategoryEntity(contentsCategory);
    return this.contentsCategoryORMRepository.update({ name: contentsCategory.name }, contentsCategoryEntity);
  }

  toContentsCategoryEntity(contentsCategory: ContentsCategory): ContentsCategoryEntity {
    const contentsCategoryEntity = new ContentsCategoryEntity();
    contentsCategoryEntity.name = contentsCategory.name;
    contentsCategoryEntity.description = contentsCategory.description;
    contentsCategoryEntity.status = contentsCategory.status;
    contentsCategoryEntity.createdAt = contentsCategory.createdAt;
    contentsCategoryEntity.updatedAt = contentsCategory.updatedAt;
    return contentsCategoryEntity;
  }

  toContentsCategoryDomain(contentsCategoryEntity: ContentsCategoryEntity): ContentsCategory {
    return new ContentsCategory(
      contentsCategoryEntity.name,
      contentsCategoryEntity.description,
      contentsCategoryEntity.status,
      contentsCategoryEntity.createdAt,
      contentsCategoryEntity.updatedAt,
    );
  }
}
