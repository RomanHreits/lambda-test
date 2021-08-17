import Web3 from 'web3';

export class Web3Provider {
  private static web3Eth: Web3;
  private static web3Bsc: Web3;
  private constructor() {
  }

  public static instanceEth(): Web3 {
    console.log(process.env.BSC_URL)
    if (!Web3Provider.web3Eth) {
      Web3Provider.web3Eth = new Web3(String(process.env.ETH_URL));
    }
    return Web3Provider.web3Eth;
  }

  public static instanceBsc(): Web3 {
    if (!Web3Provider.web3Bsc) {
      Web3Provider.web3Bsc = new Web3(String(process.env.BSC_URL));
    }
    return Web3Provider.web3Bsc;
  }
}
