import { Contents } from '../../../domain/contents.domain';
import { PartialType } from '@nestjs/mapped-types';

class ContentsCreateDto {}

class ContentsUpdateDto extends PartialType(ContentsCreateDto) {}

export interface ContentsServiceInterface {
  //todo: 이건 고민해봐야할듯,
  makeCategory(contents: Contents): Promise<Contents>;

  register(contentsCreateDto: ContentsCreateDto): Promise<Contents>;

  uploadToS3(file: any): Promise<string>;

  VideoConvertForStreaming(url: string): Promise<string>;

  update(contentsUpdateDto: ContentsUpdateDto): Promise<Contents>;

  delete(contentsUUID: string): Promise<void>;

  rewardStockAdjustment(contentsUUID: string, rewardStock: number): Promise<Contents>;

  recommend(userCategory: string): Promise<Contents[]>;
  //검색 기준 : 카테고리, 보상종류, 보상량,
  searchContents(searchFilter: any): Promise<Contents[]>;

  getContents(contentsUUID: string): Promise<Contents>;

  watchDone(userUUID: string, contentsUUID: string): Promise<void>;

  watchCancel(userUUID: string, contentsUUID: string): Promise<void>;

  requestRewardPayment(UserUUID: string, contentsUUID: string): Promise<void>;

  saveViewingHistory(UserUUID: string, contentsUUID: string): Promise<void>;
}
