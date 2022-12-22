import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/user.domain';
import { UserRepositoryInterface } from '../../../application/port/out/user.repository.interface';
import { UserEntity } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Web2LoginEntity } from './web2Login.entity';
import { Web3LoginEntity } from './web3Login.entity';
import { Web2Login } from '../../../domain/web2Login.domain';
import { Web3Login } from '../../../domain/web3Login.domain';

// Repo는 DB에 저장되어 있는 객체를 User객체로 변환하는 기능을 주로 한다.
@Injectable()
export class UserRepositoryAWS implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private userORMRepository: Repository<UserEntity>,
    @InjectRepository(Web2LoginEntity)
    private web2ORMRepository: Repository<Web2LoginEntity>,
    @InjectRepository(Web3LoginEntity)
    private web3ORMRepository: Repository<Web3LoginEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const userEntity: UserEntity = this.toUserEntity(user);
    userEntity.userUUID = undefined;
    const result: UserEntity = await this.userORMRepository.save(userEntity);
    return this.toUserDomain(result);
  }

  async findAll(): Promise<User[]> {
    const users: UserEntity[] = await this.userORMRepository.find();
    return users.map((userEntity) => this.toUserDomain(userEntity));
  }

  async findAllByPage(take: number, skip: number): Promise<User[]> {
    const users: UserEntity[] = await this.userORMRepository.find({
      where: [{ userType: 'USER' }, { userType: 'ADMIN' }],
      take: take,
      skip: skip,
    });
    return users.map((userEntity) => this.toUserDomain(userEntity));
  }

  async findOneByEmail(email: string): Promise<User> {
    const userEntity: UserEntity = await this.userORMRepository.findOneBy({ email: email });
    if (userEntity) {
      return this.toUserDomain(userEntity);
    }
    return null;
  }

  async count() {
    return await this.userORMRepository.count();
  }

  async countWithoutSuperAdmin() {
    return await this.userORMRepository.count({ where: [{ userType: 'USER' }, { userType: 'ADMIN' }] });
  }

  async findOneByUUID(userUUID: string): Promise<User> {
    const userEntity: UserEntity = await this.userORMRepository.findOneBy({
      userUUID: userUUID,
    });
    return this.toUserDomain(userEntity);
  }

  async update(user: User): Promise<UpdateResult> {
    const userEntity: UserEntity = this.toUserEntity(user);
    console.log('userEntity', userEntity);
    return await this.userORMRepository.update({ userUUID: user.uuid }, userEntity);
  }

  async delete(user: User): Promise<DeleteResult> {
    const userEntity: UserEntity = this.toUserEntity(user);
    return await this.userORMRepository.delete({
      userUUID: userEntity.userUUID,
    });
  }

  async clear() {
    await this.userORMRepository.clear();
    await this.web2ORMRepository.clear();
    await this.web3ORMRepository.clear();
  }

  toUserEntity(user: User): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.username = user.name;
    userEntity.userUUID = user.uuid;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.refreshToken = user.refreshToken;
    userEntity.accessToken = user.accessToken;
    userEntity.userType = user.userType;
    userEntity.status = user.status;
    return userEntity;
  }
  toUserDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.userUUID,
      userEntity.username,
      userEntity.email,
      userEntity.password,
      userEntity.refreshToken,
      userEntity.accessToken,
      userEntity.userType,
      userEntity.status,
    );
  }

  toWeb2Entity(web2login: Web2Login): Web2LoginEntity {
    const web2LoginEntity: Web2LoginEntity = new Web2LoginEntity();
    web2LoginEntity.name = web2login.name;
    web2LoginEntity.email = web2login.email;
    web2LoginEntity.sex = web2login.gender;
    web2LoginEntity.age = web2login.age;
    web2LoginEntity.location = web2login.location;
    web2LoginEntity.provider = web2login.provider;
    web2LoginEntity.accessToken = web2login.accessToken;
    web2LoginEntity.refreshToken = web2login.refreshToken;
    return web2LoginEntity;
  }

  toWeb2Domain(web2loginEntity: Web2LoginEntity): Web2Login {
    return new Web2Login(
      web2loginEntity.name,
      web2loginEntity.email,
      web2loginEntity.sex,
      web2loginEntity.age,
      web2loginEntity.location,
      web2loginEntity.provider,
      web2loginEntity.accessToken,
      web2loginEntity.refreshToken,
    );
  }

  toWeb3Domain(web3LoginEntity: Web3LoginEntity): Web3Login {
    return new Web3Login(
      web3LoginEntity.walletAddress,
      web3LoginEntity.provider,
      web3LoginEntity.accessToken,
      web3LoginEntity.refreshToken,
    );
  }

  toWeb3Entity(web3login: Web3Login): Web3LoginEntity {
    const web3LoginEntity = new Web3LoginEntity();
    web3LoginEntity.walletAddress = web3login.walletAddress;
    web3LoginEntity.provider = web3login.provider;
    web3LoginEntity.accessToken = web3login.accessToken;
    web3LoginEntity.refreshToken = web3login.refreshToken;
    return web3LoginEntity;
  }
}
