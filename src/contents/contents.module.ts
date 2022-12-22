import { Module } from '@nestjs/common';
import { ContentsController } from './adapter/in/web/contents.controller';
import { ContentsService } from './application/service/contents.service';
import { AwsClient } from './adapter/out/client/awsclient.client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsEntity } from './adapter/out/persistence/contents.entity';
import { ContentsRepository } from './adapter/out/persistence/contents.repository';
import { HttpModule } from '@nestjs/axios';
import { ContentsCategoryRepository } from './adapter/out/persistence/contentsCategory.repository';
import { ContentsCategoryEntity } from './adapter/out/persistence/contentsCategory.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([ContentsEntity, ContentsCategoryEntity])],
  controllers: [ContentsController],
  providers: [ContentsService, AwsClient, ContentsRepository, ContentsCategoryRepository],
})
export class ContentsModule {}
