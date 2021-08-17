"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = void 0;
const token_price_service_1 = require("./token.price.service");
const db_operations_1 = require("./db/db.operations");
async function getResult() {
    const dbData = await db_operations_1.getAssetsNewFromBd();
    const tokenPriceService = new token_price_service_1.TokenPriceService();
    return await tokenPriceService.getTokensPrices(dbData);
}
exports.getResult = getResult;
//# sourceMappingURL=index.js.map