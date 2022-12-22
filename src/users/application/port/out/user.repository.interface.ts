import { User } from '../../../domain/user.domain';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from '../../../adapter/out/persistence/user.entity';
import { Web2LoginEntity } from '../../../adapter/out/persistence/web2Login.entity';
import { Web2Login } from '../../../domain/web2Login.domain';
import { Web3LoginEntity } from '../../../adapter/out/persistence/web3Login.entity';
import { Web3Login } from '../../../domain/web3Login.domain';

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findOneByEmail(email: string): Promise<User>;

  update(user: User): Promise<UpdateResult>;
  delete(user: User): Promise<DeleteResult>;

  toUserEntity(user: User): UserEntity;
  toUserDomain(userEntity: UserEntity): User;

  toWeb2Entity(web2Login: Web2Login): Web2LoginEntity;
  toWeb2Domain(web2LoginEntity: Web2LoginEntity): Web2Login;

  toWeb3Entity(web3Login: Web3Login): Web3LoginEntity;
  toWeb3Domain(web3LoginEntity: Web3LoginEntity): Web3Login;
}

export const IUserRepository = Symbol('UserRepositoryInterface');
