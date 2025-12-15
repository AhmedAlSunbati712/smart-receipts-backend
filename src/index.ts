import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.ts"
import receiptRouter from "./routers/receipt.ts";
import receiptItemRouter from "./routers/receipt_item.ts";
import imageRouter from "./routers/image.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));


app.get("/", (req, res) => {
  res.json({ message: "backend is running" });
});

app.use("/user", userRouter);
app.use("/receipt", receiptRouter);
app.use("/receipt_item", receiptItemRouter);
app.use("/image", imageRouter);

app.listen(PORT, () =>
  console.log(`Backend server is listening on port ${PORT}`)
);
