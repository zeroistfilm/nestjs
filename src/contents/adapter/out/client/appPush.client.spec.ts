import { Test, TestingModule } from '@nestjs/testing';
import { AppPushClient } from './appPush.client';


describe('AppPushClient', () => {
  let client: AppPushClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AppPushClient],
    }).compile();

    client = module.get<AppPushClient>(AppPushClient);
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  it('should ', () => {
    client.sendPushNotification();
  });
});
