export interface Web3LoginClientInterface {
  getNFTAssets(address: string): Promise<any>;
  getWalletBalance(address: string): Promise<number>;
  ToEther(unit: string, amount: number): number;

  // validateAccessToken(accessToken: string): Promise<boolean>;
  // validateRefreshToken(refreshToken: string): Promise<boolean>;
  // getAccessToken(refreshToken: string): Promise<string>;
  // getRefreshToken(refreshToken: string): Promise<string>;
}
