import {sqlString} from "../util";
import {DatabaseConfig} from "./db.config";
import {LOGGER} from "../logger/logger";

export async function getAssetsNewFromBd() {
    const client = DatabaseConfig.getClient();
    await client.connect();
    try {
        const res = await client.query(sqlString);
        LOGGER.info(`Got information from DB - ${res.rows.length} elements`)
        return res.rows;
    } catch (e) {
        LOGGER.error(getAssetsNewFromBd, e);
        throw e;
    } finally {
        await client.end();
    }
}
