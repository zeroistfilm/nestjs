import { Module } from '@nestjs/common';
import { UserService } from './application/service/user.service';
import { UsersController } from './adapter/in/web/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './adapter/out/persistence/user.entity';
import { Web2LoginEntity } from './adapter/out/persistence/web2Login.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryAWS } from './adapter/out/persistence/user.repository.AWS';
import { Web3LoginClient } from './adapter/out/client/web3Login.client';
import { Web3LoginEntity } from './adapter/out/persistence/web3Login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, Web2LoginEntity, Web3LoginEntity])],
  controllers: [UsersController],
  providers: [UserService, JwtService, UserRepositoryAWS, Web3LoginClient], // 해당 모듈 안에서만 사용할 수 있는 provider 모듈에서 사용되는 Injectable 클래스를 의미
  exports: [UserService], // 이 모듈을 사용하는 다른 모듈에서 export한 모듈을 사용할 수 있게 해준다.
})
export class UsersModule {}
