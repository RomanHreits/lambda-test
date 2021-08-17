import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { FACTORY_ABI } from './facrory.abi';

export class FactoryContract {
  private contract: Contract;
  private web3: Web3;

  constructor(protected readonly web3Provider: Web3, protected readonly address: string) {
    this.web3 = web3Provider;
    this.contract = new web3Provider.eth.Contract(FACTORY_ABI as AbiItem[], address);
  }

  async getPairInfo(contractAddress1: string, contractAddress2: string) {
    return await this.contract.methods.getPair(contractAddress1, contractAddress2).call();
  }
}
