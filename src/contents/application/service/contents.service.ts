import { Injectable } from '@nestjs/common';
import { AwsClient } from '../../adapter/out/client/awsclient.client';
import { ContentsServiceInterface } from '../port/in/contents.service.interface';
import { Contents } from '../../domain/contents.domain';
import { PartialType } from '@nestjs/mapped-types';
import { ContentsRepository } from '../../adapter/out/persistence/contents.repository';

export class ContentsCreateDto {}
export class ContentsUpdateDto extends PartialType(ContentsCreateDto) {}

@Injectable()
export class ContentsService implements ContentsServiceInterface {
  constructor(private readonly awsClient: AwsClient, private readonly contentsRepository: ContentsRepository) {}

  async uploadToS3(file: Express.Multer.File): Promise<any> {
    //TODO db에 콘텐츠 location 저장하기
    return await this.awsClient.uploadFile(file);
  }

  VideoConvertForStreaming(url: string): Promise<string> {
    return Promise.resolve('');
  }

  delete(contentsUUID: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getContents(contentsUUID: string): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  makeCategory(contents: Contents): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  recommend(userCategory: string): Promise<Contents[]> {
    return Promise.resolve([]);
  }

  register(contentsCreateDto: ContentsCreateDto): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  requestRewardPayment(UserUUID: string, contentsUUID: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  rewardStockAdjustment(contentsUUID: string, rewardStock: number): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  saveViewingHistory(UserUUID: string, contentsUUID: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  searchContents(searchFilter: any): Promise<Contents[]> {
    return Promise.resolve([]);
  }

  update(contentsUpdateDto: ContentsUpdateDto): Promise<Contents> {
    return Promise.resolve(undefined);
  }

  watchCancel(userUUID: string, contentsUUID: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  watchDone(userUUID: string, contentsUUID: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
