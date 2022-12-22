import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from '../../../application/service/contents.service';
import { ContentsModule } from '../../../contents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsRepository } from '../../out/persistence/contents.repository';
import { ContentsEntity } from '../../out/persistence/contents.entity';

describe('ContentsController', () => {
  let controller: ContentsController;
  let contentsService: ContentsService;
  let contentsRepository: ContentsRepository;

  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: 'test.db',
            entities: [ContentsEntity],
            synchronize: true, //development only
          }),
        }),
        ContentsModule,
      ],
    }).compile();
    controller = module.get<ContentsController>(ContentsController);
    contentsService = module.get<ContentsService>(ContentsService);
    contentsRepository = module.get<ContentsRepository>(ContentsRepository);
  });

  afterEach(async () => {
    await contentsRepository.clear();
  });

  it('should be defined', () => {
    expect(contentsService).toBeDefined();
    expect(controller).toBeDefined();
  });
});
