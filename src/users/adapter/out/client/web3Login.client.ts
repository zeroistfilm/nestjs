import { Web3LoginClientInterface } from '../../../application/port/out/web3Login.client.interface';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { isEthereumAddress } from 'class-validator';
import { Network, Alchemy } from 'alchemy-sdk';

@Injectable()
export class Web3LoginClient implements Web3LoginClientInterface {

  async requestClaim(address: string, rewardType: string, reward: number): Promise<any> {

    return
  }
  async getNFTAssets(address: string): Promise<any> {
    const settings = {
      apiKey: 'bZ4hjDx39gIhAQWowyCsn8dRHY-qH7xd',
      network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(settings);
    // const nfts = await alchemy.nft.getNftsForOwner(address);
    // //
    // for (const nft of nfts.ownedNfts) {
    //   console.log(nft.contract.address);
    //   const floorPrice = await alchemy.nft.getFloorPrice(nft.contract.address);
    //   console.log(floorPrice);
    // }

    //1. 가지고 있는 토큰 전체 조회
    const nfts = await alchemy.nft.getNftsForOwner(address);
    //2. 프로젝트 별 토큰 개수 카운트
    // dict 자료구조
    // key: 프로젝트 주소
    // value: 토큰 개수
    const nftInfos = {};
    for (const nft of nfts.ownedNfts) {
      const contractAddress = nft.contract.address;
      //console.log(nft);
      if (contractAddress in nftInfos) {
        nftInfos[contractAddress].amount += 1;
      } else {
        nftInfos[contractAddress] = {
          valueInfo: null,
          totalValue: 0,
          floorPrice: 0,
          amount: 1,
          name: nft.contract.name,
        };
      }
    }
    //3. 프로젝트 별 Floor Price 조회
    // dict 자료구조
    // key: 프로젝트 주소
    // value: Floor Price
    for (const contractAddress in nftInfos) {
      const price = await alchemy.nft.getFloorPrice(contractAddress);
      nftInfos[contractAddress].valueInfo = price;
    }

    //4. 프로젝트 별 Floor Price * 토큰 개수 = 총 가치
    // dict 자료구조
    // key: 프로젝트 주소
    // value: 총 가치
    for (const contractAddress in nftInfos) {
      nftInfos[contractAddress].floorPrice = nftInfos[contractAddress].valueInfo.openSea.floorPrice;
      nftInfos[contractAddress].totalValue =
        nftInfos[contractAddress].valueInfo.openSea.floorPrice * nftInfos[contractAddress].amount;
    }
    console.log(nftInfos);

    //총 자산합 계산
    let totalAsset = 0;
    for (const contractAddress in nftInfos) {
      totalAsset += nftInfos[contractAddress].totalValue;
    }

    return totalAsset;
  }

  async getWalletBalance(address: string): Promise<number> {
    if (!isEthereumAddress(address)) {
      throw new Error('Invalid Ethereum Address');
    }
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=acamount&action=balance&address=${address}&tag=latest&apikey=VIS9YA1HUR9FF6XZA6T6ZHC11PF8UUSWVF`,
      );
      return this.ToEther('wei', +response.data.result);
    } catch (err) {
      throw new Error(err);
    }
  }

  ToEther(unit: string, amount: number): number {
    switch (unit) {
      case 'wei':
        return amount * 1e-18;
      case 'kwei':
        return amount * 1e-15;
      case 'mwei':
        return amount * 1e-12;
      case 'gwei':
        return amount * 1e-9;
      case 'szabo':
        return amount * 1e-6;
      case 'finney':
        return amount * 1e-3;
      case 'ether':
        return amount;
      case 'kether':
        return amount * 1e3;
      case 'mether':
        return amount * 1e6;
      case 'gether':
        return amount * 1e9;
      case 'tether':
        return amount * 1e12;
    }
  }
}
