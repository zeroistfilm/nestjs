export class Web3Login {
  id: number;
  walletAddress: string;
  walletBalance: number;
  provider: string;
  accessToken: string;
  refreshToken: string;
  constructor(walletAddress: string, provider: string, accessToken: string, refreshToken: string) {
    this.walletAddress = walletAddress;
    this.provider = provider;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
  setWalletBalance(walletBalance: number) {
    this.walletBalance = walletBalance;
  }
  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
