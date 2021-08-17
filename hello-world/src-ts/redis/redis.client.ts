import Redis from "ioredis";

export const redis = new Redis(
    Number(process.env.REDIS_PORT),
    process.env.REDIS_HOST,
    {
        password: process.env.REDIS_AUTH
});
