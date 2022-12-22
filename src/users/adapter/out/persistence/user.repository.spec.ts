import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryAWS } from './user.repository.AWS';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../../../users.module';

import { User, UserStatus, UserType } from '../../../domain/user.domain';
import { UserEntity } from './user.entity';
import { Web3LoginEntity } from './web3Login.entity';
import { Web2LoginEntity } from './web2Login.entity';
import { Web2Login } from '../../../domain/web2Login.domain';
import { Web3Login } from '../../../domain/web3Login.domain';

describe('UsersRepository', () => {
  let userRepository: UserRepositoryAWS;

  //FOR AWS DB
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [
  //       TypeOrmModule.forRoot({
  //         type: 'mysql',
  //         host: 'dropbase.cxzszwizrutv.ap-northeast-2.rds.amazonaws.com',
  //         port: +'3306',
  //         username: 'admin',
  //         password: 'dropbasetpxadmin',
  //         database: 'repoTest',
  //         // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //         autoLoadEntities: true,
  //         synchronize: true,
  //       }),
  //       UsersModule,
  //     ],
  //   }).compile();
  //   userRepository = module.get<UserRepositoryAWS>(UserRepositoryAWS);
  // });

  //FOR MEMORY DB
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
    userRepository = module.get<UserRepositoryAWS>(UserRepositoryAWS);
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  it('should ', function () {
    expect(userRepository).toBeDefined();
  });

  it('유저 생성', async () => {
    const newUser = createRandomUser();
    const result = await userRepository.save(newUser);
    const foundUser = await userRepository.findOneByEmail(newUser.email);
    expect(foundUser).toStrictEqual(result);
  });

  it('100개 유저', async () => {
    for (let i = 0; i < 100; i++) {
      await userRepository.save(createRandomUser());
    }
    const users = await userRepository.findAll();
    expect(users.length).toBe(100);
  });

  it('유저 페이징', async () => {
    const users: User[] = [];
    for (let i = 0; i < 20; i++) {
      const newUser = createRandomUser();
      await userRepository.save(newUser);
      users.push(newUser);
    }
    const usersFromDB = await userRepository.findAllByPage(10, 5); // index 6부터 10개
    expect(users[5].email).toBe(usersFromDB[0].email);
  });
});

function getRandom(strArray: string[]) {
  return strArray[Math.floor(Math.random() * strArray.length)];
}

export function createRandomUser() {
  const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const randomName = Math.random().toString(36).substring(2, 15);
  const randomEmail = Math.random().toString(36).substring(2, 15) + '@test.com';
  const randomPassword = Math.random().toString(36).substring(2, 15);
  const randomRefreshToken = Math.random().toString(36).substring(2, 15);
  const randomAccessToken = Math.random().toString(36).substring(2, 15);

  return new User(
    uuid,
    randomName,
    randomEmail,
    randomPassword,
    randomRefreshToken,
    randomAccessToken,
    UserType.USER,
    UserStatus.ACTIVE,
  );
}

export function createRandomWeb2Login() {
  const randomName = Math.random().toString(36).substring(2, 15);
  const randomEmail = Math.random().toString(36).substring(2, 15) + '@test.com';
  const randomGender = getRandom(['Male', 'Female']);
  const randomAge = Math.floor(Math.random() * 80);
  const randomLocation = Math.random().toString(36).substring(2, 15);
  const randomProvider = getRandom(['google', 'facebook', 'twitter']);
  const randomAccessToken = Math.random().toString(36).substring(2, 15);
  const randomRefreshToken = Math.random().toString(36).substring(2, 15);

  return new Web2Login(
    randomName,
    randomEmail,
    randomGender,
    randomAge,
    randomLocation,
    randomProvider,
    randomAccessToken,
    randomRefreshToken,
  );
}

export function createRandomWeb3Login() {
  //create random wallet Ethereum address

  const randomWalletAddress = randomEthereumAddress();
  const randomProvider = getRandom(['metamask', 'walletconnect']);
  const randomAccessToken = Math.random().toString(36).substring(2, 15);
  const randomRefreshToken = Math.random().toString(36).substring(2, 15);

  return new Web3Login(randomWalletAddress, randomProvider, randomAccessToken, randomRefreshToken);
}

function randomEthereumAddress() {
  return (
    '0x' +
    Math.random().toString(16).substring(2, 12) +
    Math.random().toString(16).substring(2, 12) +
    Math.random().toString(16).substring(2, 12) +
    Math.random().toString(16).substring(2, 12)
  );
}
