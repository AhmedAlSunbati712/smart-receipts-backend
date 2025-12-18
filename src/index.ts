import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.ts"
import receiptRouter from "./routers/receipt.ts";
import receiptItemRouter from "./routers/receipt_item.ts";
import imageRouter from "./routers/image.ts";
import ocrRouter from "./routers/ocr.ts";
import cookieParser from "cookie-parser";
import ocrUIRouter from "./queues/ui/ocr_queue.ts";
import gptRouter from "./routers/gpt.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));


app.get("/", (req, res) => {
  res.json({ message: "backend is running" });
});

app.use("/user", userRouter);
app.use("/receipt", receiptRouter);
app.use("/receipt_item", receiptItemRouter);
app.use("/image", imageRouter);
app.use("/ocr", ocrRouter);
app.use("/admin/queues", ocrUIRouter);
app.use("/gpt", gptRouter)

app.listen(PORT, () =>
  console.log(`Backend server is listening on port ${PORT}`)
);
