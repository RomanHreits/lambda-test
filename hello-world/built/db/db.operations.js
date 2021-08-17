"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetsNewFromBd = void 0;
const util_1 = require("../util");
const db_config_1 = require("./db.config");
const logger_1 = require("../logger/logger");
async function getAssetsNewFromBd() {
    const client = db_config_1.DatabaseConfig.getClient();
    await client.connect();
    try {
        const res = await client.query(util_1.sqlString);
        logger_1.LOGGER.info(`Got information from DB - ${res.rows.length} elements`);
        return res.rows;
    }
    catch (e) {
        logger_1.LOGGER.error(getAssetsNewFromBd, e);
        throw e;
    }
    finally {
        await client.end();
    }
}
exports.getAssetsNewFromBd = getAssetsNewFromBd;
//# sourceMappingURL=db.operations.js.map