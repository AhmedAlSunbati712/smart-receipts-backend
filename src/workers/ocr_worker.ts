import { Worker } from "bullmq";
import redisConnection from "../config/redis.ts";
import { OCR_QUEUE_NAME } from "../queues/ocr_queue.ts";
import { createWorker } from "tesseract.js";

let tesseractWorkerPromise = createWorker("eng").catch(err => {
  console.error("[!] Failed to initialize Tesseract:", err);
  process.exit(1);
});

export const ocrWorker = new Worker(
  OCR_QUEUE_NAME,
  async job => {
    console.log(`Processing job ${job.id}...`);
    const { imageUrl } = job.data;
    console.log(imageUrl);

    const tesseractWorker = await tesseractWorkerPromise;

    const result = await tesseractWorker.recognize(imageUrl);

    console.log(`[*] Job ${job.id} completed.`);
    return {
      text: result.data.text,
    };
  },
  {
    connection: redisConnection,
    concurrency: 10, 
  }
);

ocrWorker.on("ready", () => {
  console.log(`[+] Worker is ready and connected to Redis queue: ${OCR_QUEUE_NAME}`);
});

ocrWorker.on("failed", (job, err) => {
  console.error(`[!] Job ${job?.id} failed:`, err);
});

ocrWorker.on("error", (err) => {
  console.error("[!] Worker encountered an error:", err);
});