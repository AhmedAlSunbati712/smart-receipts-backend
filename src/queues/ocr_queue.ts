import { Queue, Worker } from "bullmq";
import redisConnection from "../config/redis.ts";

export const OCR_QUEUE_NAME = "ocr";
export const ocrQueue = new Queue(OCR_QUEUE_NAME, {
    connection: redisConnection,
});