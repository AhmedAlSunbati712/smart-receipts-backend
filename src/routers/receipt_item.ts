import express from "express";
import receiptItemController from "../controllers/receipt_item.ts";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied" });
    }
    const token = authHeader.replace("Bearer ", "").trim();
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

const receiptItemRouter = express.Router();

receiptItemRouter.get("/", verifyToken, receiptItemController.getReceiptItem);
receiptItemRouter.put("/:id", verifyToken, receiptItemController.updateReceiptItem);
receiptItemRouter.delete("/:id", verifyToken, receiptItemController.deleteReceiptItem);

export default receiptItemRouter;