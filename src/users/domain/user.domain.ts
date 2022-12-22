import { Web2Login } from './web2Login.domain';
import { Web3Login } from './web3Login.domain';

export class User {
  uuid: string;
  name: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  userType: string;
  totalReward = new Map<string, number>();
  favoriteCategory: string[] = [];
  web2Login: Web2Login[] = [];
  web3Login: Web3Login[] = [];
  status: string;

  constructor(
    uuid: string,
    name: string,
    email: string,
    password: string,
    refreshToken: string,
    accessToken: string,
    userType: string,
    status: string,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.password = password;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.userType = userType;
    this.status = status;
  }

  isSuperAdmin(): boolean {
    return this.userType === UserType.SUPERADMIN;
  }
  isAdmin(): boolean {
    return this.userType === UserType.ADMIN;
  }

  isExceptedSuperAdmin(): boolean {
    return this.userType !== UserType.SUPERADMIN;
  }

  setSuperAdmin(): void {
    this.userType = UserType.SUPERADMIN;
  }

  setAdmin(user): void {
    if (!this.isSuperAdmin()) {
      throw new Error('Not authorized');
    }
    user.userType = UserType.ADMIN;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
  payReward(TokenName, amount) {
    this.totalReward.get(TokenName)
      ? this.totalReward.set(TokenName, this.totalReward.get(TokenName) + amount)
      : this.totalReward.set(TokenName, amount);
  }

  deductReward(TokenName, amount) {
    if (amount > this.totalReward.get(TokenName)) {
      throw new Error('Not enough reward');
    }
    this.totalReward.get(TokenName)
      ? this.totalReward.set(TokenName, this.totalReward.get(TokenName) - amount)
      : this.totalReward.set(TokenName, 0);
  }

  addFavoriteCategory(category: string): string[] {
    if (!this.favoriteCategory.includes(category)) {
      this.favoriteCategory.push(category);
    }
    return this.favoriteCategory;
  }
  removeFavoriteCategory(category: string): string[] {
    this.favoriteCategory = this.favoriteCategory.filter((c) => c !== category);
    return this.favoriteCategory;
  }

  getFavoriteCategory(): string[] {
    return this.favoriteCategory;
  }
  addWeb2Login(web2Login: Web2Login): Web2Login[] {
    if (!this.web2Login.includes(web2Login)) {
      this.web2Login.push(web2Login);
    }
    return this.web2Login;
  }
  removeWeb2Login(web2Login: Web2Login): Web2Login[] {
    this.web2Login = this.web2Login.filter((w) => w !== web2Login);
    return this.web2Login;
  }
  addWeb3Login(web3Login: Web3Login): Web3Login[] {
    if (!this.web3Login.includes(web3Login)) {
      this.web3Login.push(web3Login);
    }
    return this.web3Login;
  }
  removeWeb3Login(web3Login: Web3Login): Web3Login[] {
    this.web3Login = this.web3Login.filter((w) => w !== web3Login);
    return this.web3Login;
  }
  getTotalWalletBalance(): number {
    return this.web3Login.reduce((acc, cur) => acc + cur.walletBalance, 0);
  }
  getWalletAddress(): string[] {
    return this.web3Login.map((w) => w.walletAddress);
  }

  getWeb2Login(): Web2Login[] {
    return this.web2Login;
  }
  getWeb3Login(): Web3Login[] {
    return this.web3Login;
  }
}
export enum UserType {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
}
