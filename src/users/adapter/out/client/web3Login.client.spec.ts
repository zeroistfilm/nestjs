import { Web3LoginClient } from './web3Login.client';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersService', () => {
  let web3LoginClient: Web3LoginClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Web3LoginClient],
      imports: [],

    }).compile();

    web3LoginClient = module.get<Web3LoginClient>(Web3LoginClient);
  });

  it('정상적인 API콜', async () => {
    const balance = await web3LoginClient.getWalletBalance('0x6FD1F8F3e2047F774Cd2561c409fb93DcE5C61AF');
    console.log(balance);
    expect(balance).toBeGreaterThan(0);
  });

  it('잘못된 이더리움 주소인 경우', async () => {
    const invalidAddress = '0x6FD1F8F3e2047F774Cd2561c409fb93DcE5C61A';
    await expect(web3LoginClient.getWalletBalance(invalidAddress)).rejects.toThrow('Invalid Ethereum Address');
  });

  it('nft 자산 조회', async () => {
    const address2 = '0x7f5d1970c474dac277c9a8c44214ac89cdab9b39';
    const address = '0x6FD1F8F3e2047F774Cd2561c409fb93DcE5C61AF';
    const result = await web3LoginClient.getNFTAssets(address2);
    console.log(address2, 'has values', result, 'ETH of nft assets (floor price)');
  });
});
