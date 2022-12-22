import { Test, TestingModule } from '@nestjs/testing';
import { AwsClient } from './awsclient.client';

describe('AwsclientService', () => {
  let service: AwsClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsClient],
    }).compile();

    service = module.get<AwsClient>(AwsClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
