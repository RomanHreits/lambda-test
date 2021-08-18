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

export interface Asset {
    id: number;
    address: string;
    name: number;
    symbol: string;
    decimals: number;
}

export interface AssetConfig {
    asset: Asset;
    pairs: Pair[];
}
