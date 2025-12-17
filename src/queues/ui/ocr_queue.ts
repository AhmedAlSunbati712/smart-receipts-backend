import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { ocrQueue } from "../ocr_queue.ts";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullMQAdapter(ocrQueue)],
    serverAdapter: serverAdapter,
});

const ocrUIRouter = serverAdapter.getRouter();
export default ocrUIRouter;