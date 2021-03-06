import {AssetConfig, Pair} from "./interfaces";
import {MultiCallBsc} from "./chain/multicall/multicallbsc";
import {deriveBNBPrice} from "./util";

export class TokenPriceService {
    async getTokensPrices(assetsConfigs: AssetConfig[]) {
        const multiCall = new MultiCallBsc();
        const uniquePairsAddresses = new Set<string>();
        assetsConfigs.forEach(config => {
            config.pairs?.forEach((pair: Pair) => uniquePairsAddresses.add(pair.address));
        });

        const addressesArray = Array.from(uniquePairsAddresses);
        const [pairsReserves, totalSupplies] = await Promise.all([multiCall.getPairsReserves(addressesArray),
            multiCall.getTotalSupplies(addressesArray),
        ]);

        // const result = deriveBNBPrice(assetsConfigs, pairsReserves.reserves);
        // console.log(result);
        // TODO return result;
    }
}
