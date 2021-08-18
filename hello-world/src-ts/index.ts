import {TokenPriceService} from "./token.price.service";
import {getAllAssets} from "./db/asset.dao";
import {AssetConfig} from "./interfaces";

export async function getResult() {
    const assets: AssetConfig[] = await getAllAssets();
    const prices = await new TokenPriceService().getTokensPrices(assets);
}
