import {Client} from "pg";
import dotenv from "dotenv";

dotenv.config();

export const databaseClient: Client = new Client(process.env.CONNECT_STR);
