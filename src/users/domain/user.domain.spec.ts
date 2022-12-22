import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from './user.domain';
import { Web2Login } from './web2Login.domain';
import { Web3Login } from './web3Login.domain';

describe('UserDomain', () => {
  let user: User;
  const superAdmin = new User('1', 'name', 'email', 'password', 'refresh', 'access', 'USER', 'ACTIVATE');
  superAdmin.setSuperAdmin();

  const getNewUser = () => {
    return new User('1', 'name', 'email', 'password', 'refresh', 'access', 'USER', 'ACTIVATE');
  };

  const getNewWeb2Login = () => {
    return new Web2Login('name', 'email', 'male', 15, 'seoul', 'google', 'access', 'refresh');
  };

  const getNewWeb3Login = () => {
    return new Web3Login('address', 'metamask', 'access', 'refresh');
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User],
    }).compile();

    user = module.get<User>(User);
  });

  it('should be defined', () => {
    expect(user).toBeDefined();
  });

  it('유저에게 보상 지급', () => {
    const user = getNewUser();
    user.payReward('ethereum', 100);
    expect(user.totalReward.get('ethereum')).toBe(100);
  });

  it('유저의 보상 인출', () => {
    const user = getNewUser();
    user.payReward('ethereum', 100);
    user.deductReward('ethereum', 50);
    expect(user.totalReward.get('ethereum')).toBe(50);
  });

  it('다양한 토큰을 가지고 있는 상태에서 특정 토큰의 값만 변경', () => {
    const user = getNewUser();
    user.payReward('ethereum', 100);
    user.payReward('bitcoin', 1000);
    user.payReward('near', 500);
    user.deductReward('ethereum', 50);
    expect(user.totalReward.get('ethereum')).toBe(50);
    expect(user.totalReward.get('bitcoin')).toBe(1000);
  });

  it('부족한 토큰을 인출 하려고 할 때', () => {
    const user = getNewUser();
    user.payReward('ethereum', 100);
    expect(() => user.deductReward('ethereum', 200)).toThrowError('Not enough reward');
  });

  it('슈퍼 어드민, 일반 유저에게 어드민 부여', () => {
    const user = getNewUser();
    expect(user.isAdmin()).toBe(false);
    superAdmin.setAdmin(user);
    expect(user.isAdmin()).toBe(true);
  });

  it('일반 유저가, 일반 유저에게 어드민 부여', () => {
    const user = getNewUser();
    const otherUser = new User('1', 'name', 'email', 'password', 'refresh', 'access', 'USER', 'ACTIVATE');
    expect(user.isAdmin()).toBe(false);
    expect(() => otherUser.setAdmin(user)).toThrowError('Not authorized');
  });

  it('선호 카테고리 등록', () => {
    const user = getNewUser();
    user.addFavoriteCategory('movie');
    user.addFavoriteCategory('sport');
    user.addFavoriteCategory('tech');
    expect(user.favoriteCategory).toContain('movie');
    expect(user.favoriteCategory).toContain('sport');
    expect(user.favoriteCategory).toContain('tech');
  });

  it('선호 카테고리 삭제', () => {
    const user = getNewUser();
    user.addFavoriteCategory('movie');
    user.addFavoriteCategory('sport');
    user.addFavoriteCategory('tech');
    user.removeFavoriteCategory('movie');
    expect(user.favoriteCategory).not.toContain('movie');
    expect(user.favoriteCategory).toContain('sport');
    expect(user.favoriteCategory).toContain('tech');
  });

  it('선호 카테고리 중복 등록 방지', () => {
    const user = getNewUser();
    user.addFavoriteCategory('movie');
    user.addFavoriteCategory('movie');
    expect(user.getFavoriteCategory()).toHaveLength(1);
  });

  it('web2로그인 추가', () => {
    const user = getNewUser();
    const login = getNewWeb2Login();
    user.addWeb2Login(login);
    expect(user.web2Login).toContain(login);
  });
  it('web3로그인 추가', () => {
    const user = getNewUser();
    const login = getNewWeb3Login();
    user.addWeb3Login(login);
    expect(user.web3Login).toContain(login);
  });

  it('web2로그인 삭제', () => {
    const user = getNewUser();
    const login = getNewWeb2Login();
    user.addWeb2Login(login);
    user.removeWeb2Login(login);
    expect(user.web2Login).not.toContain(login);
  });
  it('web3로그인 삭제', () => {
    const user = getNewUser();
    const login = getNewWeb3Login();
    user.addWeb3Login(login);
    user.removeWeb3Login(login);
    expect(user.web3Login).not.toContain(login);
  });

  it('web3 지갑 가치 조회', () => {
    const user = getNewUser();
    const wallet1 = getNewWeb3Login();
    wallet1.setWalletBalance(100);
    user.addWeb3Login(wallet1);
    const wallet2 = getNewWeb3Login();
    wallet2.setWalletBalance(200);
    user.addWeb3Login(wallet2);
    expect(user.getTotalWalletBalance()).toBe(300);
  });

  it('web3 지갑 주소 조회', () => {
    const user = getNewUser();
    const wallet1 = new Web3Login('0x1234', 'metamask', 'access', 'refresh');
    user.addWeb3Login(wallet1);
    const wallet2 = new Web3Login('0x5678', 'coinbase', 'access', 'refresh');
    user.addWeb3Login(wallet2);
    expect(user.getWalletAddress()).toContain('0x1234');
    expect(user.getWalletAddress()).toContain('0x5678');
  });

  it('web2로그인 조회', () => {
    const user = getNewUser();
    const login = getNewWeb2Login();
    user.addWeb2Login(login);
    expect(user.getWeb2Login()).toContain(login);
  });
  it('web3로그인 조회', () => {
    const user = getNewUser();
    const login = getNewWeb3Login();
    user.addWeb3Login(login);
    expect(user.getWeb3Login()).toContain(login);
  });

  it('superadmin제외 조회', () => {
    const users: User[] = [];
    const user1 = getNewUser();
    const user2 = getNewUser();
    users.push(superAdmin);
    users.push(user1);
    users.push(user2);
    const filtered = users.filter((user) => user.isExceptedSuperAdmin());
    expect(filtered).toHaveLength(2);
  });

  it('enum값 조회', () => {
    console.log(Object.keys(UserType).filter((value) => value !== UserType.SUPERADMIN));
  });
});
