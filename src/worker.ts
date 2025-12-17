import { ocrWorker } from "./workers/ocr_worker.ts";

console.log("OCR worker service is starting...");

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing worker...`);
  await ocrWorker.close();
  console.log("Worker closed. Exiting...");
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
