"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceRedisKey = exports.deriveBNBPrice = exports.StableCoinAddresses = exports.sqlString = void 0;
const logger_1 = require("./logger/logger");
exports.sqlString = 'SELECT an.address as coinAddress, an.name, an.symbol, an.decimals, ac.pairs FROM assets_config ac JOIN assets_new an on ac.asset_id = an.id limit 1';
var StableCoinAddresses;
(function (StableCoinAddresses) {
    StableCoinAddresses["BUSDT"] = "0x55d398326f99059ff775485246999027b3197955";
    StableCoinAddresses["BUSD"] = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
    StableCoinAddresses["USDC"] = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
})(StableCoinAddresses = exports.StableCoinAddresses || (exports.StableCoinAddresses = {}));
async function deriveBNBPrice(pools, tokenReserves) {
    const priceMap = new Map();
    await Promise.all(pools.map(async (pool) => {
        let totalLiquidityToken = 0;
        const stableCoinsMap = new Map();
        pool.pairs.forEach(pair => {
            var _a, _b;
            const reserve = tokenReserves[`${pair.address}`];
            pair.tokens[0].reserved = pair.tokens[0].pairPosition === 0 ? reserve.reserve0 : reserve.reserve1;
            pair.tokens[1].reserved = pair.tokens[1].pairPosition === 0 ? reserve.reserve0 : reserve.reserve1;
            if (((_a = pair.tokens[0]) === null || _a === void 0 ? void 0 : _a.tokenAddress) === pool.coinAddress) {
                stableCoinsMap.set(pair.tokens[1].tokenAddress, { reserveStable: pair.tokens[1].reserved, reserveCoin: pair.tokens[0].reserved });
                totalLiquidityToken += Number(pair.tokens[0].reserved);
            }
            else {
                stableCoinsMap.set((_b = pair.tokens[0]) === null || _b === void 0 ? void 0 : _b.tokenAddress, { reserveStable: pair.tokens[0].reserved, reserveCoin: pair.tokens[1].reserved });
                totalLiquidityToken += Number(pair.tokens[1].reserved);
            }
        });
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
        logger_1.LOGGER.info(`${pool.coinAddress} - ${price}`);
        // await redis.set(getPriceRedisKey(pool.address), price, 'ex', 60);
        return;
    }));
    return priceMap;
}
exports.deriveBNBPrice = deriveBNBPrice;
function getPriceRedisKey(coinAddress) {
    return `Coin price for ${coinAddress}`;
}
exports.getPriceRedisKey = getPriceRedisKey;
//# sourceMappingURL=util.js.map