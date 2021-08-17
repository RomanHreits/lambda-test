"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPriceService = void 0;
const multicallbsc_1 = require("./chain/multicall/multicallbsc");
const util_1 = require("./util");
class TokenPriceService {
    async getTokensPrices(assetsConfigs) {
        const multiCall = new multicallbsc_1.MultiCallBsc();
        const uniquePairsAddresses = new Set();
        assetsConfigs.forEach(config => {
            var _a;
            (_a = config.pairs) === null || _a === void 0 ? void 0 : _a.forEach(pair => uniquePairsAddresses.add(pair.address));
        });
        const addressesArray = Array.from(uniquePairsAddresses);
        const [pairsReserves, totalSupplies] = await Promise.all([multiCall.getPairsReserves(addressesArray),
            multiCall.getTotalSupplies(addressesArray),
        ]);
        const result = util_1.deriveBNBPrice(assetsConfigs, pairsReserves.reserves);
        console.log(result);
    }
}
exports.TokenPriceService = TokenPriceService;
//# sourceMappingURL=token.price.service.js.map