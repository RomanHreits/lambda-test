import {TokenPriceService} from "./token.price.service";
import {getAssetsNewFromBd} from "./db/db.operations";

export async function getResult() {
    const dbData = await getAssetsNewFromBd();
    const tokenPriceService = new TokenPriceService();
    return await tokenPriceService.getTokensPrices(dbData);
}
