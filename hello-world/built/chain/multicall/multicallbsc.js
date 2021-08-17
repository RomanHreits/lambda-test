"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiCallBsc = void 0;
const multicall_1 = require("@indexed-finance/multicall");
const bignumber_js_1 = require("bignumber.js");
const abi_1 = require("../uniswapv2pair/abi");
const web3_provider_1 = require("../web3.provider");
class MultiCallBsc extends multicall_1.MultiCall {
    constructor() {
        super(web3_provider_1.Web3Provider.instanceBsc());
    }
    async getPairsReserves(pairs) {
        const chunkSize = 100;
        let blockNumberLast;
        const convertedReserves = {};
        for (let i = 0, j = pairs.length; i < j; i += chunkSize) {
            const pairsSlice = pairs.slice(i, i + chunkSize);
            const [blockNumber, multiCallReserves] = await super.getReserves(pairsSlice);
            blockNumberLast = blockNumber;
            for (const key in pairsSlice) {
                convertedReserves[pairsSlice[key]] = {
                    reserve0: multiCallReserves[pairsSlice[key]].reserve0.toString(),
                    reserve1: multiCallReserves[pairsSlice[key]].reserve1.toString(),
                    blockTimestampLast: multiCallReserves[pairsSlice[key]].blockTimestampLast,
                };
            }
        }
        return {
            // @ts-ignore
            block: blockNumberLast,
            reserves: convertedReserves,
        };
    }
    async getTotalSupplies(pairs) {
        const chunkSize = 50;
        let blockNumberLast;
        const convertedTotalSupplies = {};
        for (let i = 0, j = pairs.length; i < j; i += chunkSize) {
            const pairsSlice = pairs.slice(i, i + chunkSize);
            const inputs = [];
            pairsSlice.map((p) => inputs.push({ target: p, function: 'totalSupply' }));
            const [blockNumber, multicallSupplies] = await this.multiCall(abi_1.UNISWAP_PAIR_ABI, inputs);
            blockNumberLast = blockNumber;
            for (const key in pairsSlice) {
                convertedTotalSupplies[pairsSlice[key]] = new bignumber_js_1.BigNumber(multicallSupplies[key].toString());
            }
        }
        return {
            // @ts-ignore
            block: blockNumberLast,
            totalSupplies: convertedTotalSupplies,
        };
    }
}
exports.MultiCallBsc = MultiCallBsc;
//# sourceMappingURL=multicallbsc.js.map