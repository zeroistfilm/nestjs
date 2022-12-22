import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../adapter/out/persistence/user.entity';
import { Web3LoginEntity } from '../../adapter/out/persistence/web3Login.entity';
import { Web2LoginEntity } from '../../adapter/out/persistence/web2Login.entity';
import { UsersModule } from '../../users.module';
import { UserRepositoryAWS } from '../../adapter/out/persistence/user.repository.AWS';

describe('UsersService', () => {
  let userService: UserService;
  let userRepository: UserRepositoryAWS;

  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: 'test.db',
            entities: [UserEntity, Web3LoginEntity, Web2LoginEntity],
            synchronize: true, //development only
          }),
        }),
        UsersModule,
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepositoryAWS>(UserRepositoryAWS);
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  it('should ', function () {
    expect(userService).toBeDefined();
  });
});
