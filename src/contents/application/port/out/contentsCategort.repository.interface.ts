import { ContentsCategory } from '../../../domain/ContentsCategory.domain';
import { DeleteResult, UpdateResult } from "typeorm";

export interface ContentsCategoryRepositoryInterface {
  clear(): Promise<void>;
  delete(contentsCategoryUUID: string): Promise<DeleteResult>;
  save(contentsCategory: ContentsCategory): Promise<ContentsCategory>;

  findOne(categoryName: string): Promise<ContentsCategory>;
  update(contentsCategory: ContentsCategory): Promise<UpdateResult>;
}
