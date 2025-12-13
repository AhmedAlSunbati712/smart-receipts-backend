import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.ts"
import receiptRouter from "./routers/receipt.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "backend is running" });
});
app.use("/user", userRouter);
app.use("/receipt", receiptRouter);

app.listen(PORT, () =>
  console.log(`Backend server is listening on port ${PORT}`)
);
