import {Redis} from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const redisConfig = {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_URL || '127.0.0.1',
    
};

const redisConnection = new Redis("redis://localhost:6379", {maxRetriesPerRequest: null});
export default redisConnection;