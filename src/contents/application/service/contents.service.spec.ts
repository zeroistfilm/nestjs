import { ContentsService } from './contents.service';
import { ContentsRepository } from '../../adapter/out/persistence/contents.repository';
import { ContentsController } from '../../adapter/in/web/contents.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsEntity } from '../../adapter/out/persistence/contents.entity';
import { ContentsModule } from '../../contents.module';

describe('ContentsController', () => {
  let contentsController: ContentsController;
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
    contentsController = module.get<ContentsController>(ContentsController);
    contentsService = module.get<ContentsService>(ContentsService);
    contentsRepository = module.get<ContentsRepository>(ContentsRepository);
  });

  afterEach(async () => {
    await contentsRepository.clear();
  });

  it('should be defined', () => {
    expect(contentsService).toBeDefined();
    expect(contentsController).toBeDefined();
  });
});
