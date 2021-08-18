import {AssetConfig, Pair} from "./interfaces";
import {UniswapReservesData} from "./chain/multicall/types/token";
import {LOGGER} from "./logger/logger";
import {redis} from "./redis/redis.client";

export enum StableCoinAddresses {
    BUSDT = '0x55d398326f99059ff775485246999027b3197955',
    BUSD = '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    USDC = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
}

export async function deriveBNBPrice(pools: AssetConfig[], tokenReserves: UniswapReservesData): Promise<Map<string, number>> {
    const priceMap = new Map<string, number>();
    await Promise.all(pools.map(async pool => {
        let totalLiquidityToken = 0;
        const stableCoinsMap = new Map<string, { reserveStable: string, reserveCoin: string }>();
        pool.pairs.forEach((pair: Pair) => {
            const reserve = tokenReserves[pair.address];
            pair.tokens[0].reserved = pair.tokens[0].pairPosition === 0 ? reserve.reserve0 : reserve.reserve1;
            pair.tokens[1].reserved = pair.tokens[1].pairPosition === 0 ? reserve.reserve0 : reserve.reserve1;

            if (pair.tokens[0]?.tokenAddress === pool.asset.address) {
                stableCoinsMap.set(pair.tokens[1].tokenAddress,
                    {reserveStable: pair.tokens[1].reserved, reserveCoin: pair.tokens[0].reserved});
                totalLiquidityToken += Number(pair.tokens[0].reserved);
            } else {
                stableCoinsMap.set(pair.tokens[0]?.tokenAddress,
                    {reserveStable: pair.tokens[0].reserved, reserveCoin: pair.tokens[1].reserved});
                totalLiquidityToken += Number(pair.tokens[1].reserved);
            }
        })

        const busdConfig = stableCoinsMap.get(StableCoinAddresses.BUSD);
        const busdtConfig = stableCoinsMap.get(StableCoinAddresses.BUSDT);
        const usdcConfig = stableCoinsMap.get(StableCoinAddresses.USDC);

        const busdWeight = Number(busdConfig.reserveCoin) / totalLiquidityToken;
        const usdcWeight = Number(usdcConfig.reserveCoin) / totalLiquidityToken;
        const busdtWeight = Number(busdtConfig.reserveCoin) / totalLiquidityToken;

        const bnbPriceUsdc = Number(usdcConfig.reserveStable) / Number(usdcConfig.reserveCoin);
        const bnbPriceBusd = Number(busdConfig.reserveStable) / Number(busdConfig.reserveCoin);
        const bnbPriceBusdt = Number(busdtConfig.reserveStable) / Number(busdtConfig.reserveCoin);

        const price = busdWeight * bnbPriceBusd + usdcWeight * bnbPriceUsdc + busdtWeight * bnbPriceBusdt;
        LOGGER.info(`${pool.asset.address} - ${price}`);
        // await redis.set(getPriceRedisKey(pool.asset.address), price, 'ex', 60);
        // await redis.hset("Coin price", pool.asset.address, price, 'ex', 60);
        return;
    }));
    return priceMap;
}

export function getPriceRedisKey(coinAddress: string) {
    return `Coin price for ${coinAddress}`
}
