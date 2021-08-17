import {Client} from "pg";
import dotenv from "dotenv";

dotenv.config();

export class DatabaseConfig {
    private static client: Client;
    private constructor() {
    }

    public static getClient() {
        if (!DatabaseConfig.client) {
            console.log(process.env.CONNECT_STR);
            DatabaseConfig.client = new Client(process.env.CONNECT_STR);
        }
        return DatabaseConfig.client;
    }
}
