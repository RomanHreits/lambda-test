import {databaseClient} from "./db.config";
import {LOGGER} from "../logger/logger";

export async function executeQuery(sqlString: string): Promise<any[]> {
    await databaseClient.connect();
    try {
        const res = await databaseClient.query(sqlString);
        LOGGER.info(`Got information from DB - ${res.rows.length} elements`)
        return res.rows;
    } catch (e) {
        LOGGER.error("Can not get info from DB", e);
        throw e;
    } finally {
        await databaseClient.end();
    }
}
