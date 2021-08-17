export interface Token {
    tokenAddress?: string;
    pairPosition?: number;
    name?: string;
    reserved?: string;
}

export interface Pair {
    address: string;
    type: string;
    totalSupply: string;
    tokens?: Token[];
}

export interface AssetsConfigInterface {
    coinAddress: string;
    name: string;
    symbol: string;
    decimals: number;
    pairs: Pair[];
}
