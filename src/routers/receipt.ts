import express from "express";
import receiptController from "../controllers/receipt.ts";
import receiptItemController from "../controllers/receipt_item.ts";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.auth;
  
    if (!token) {
      return res.status(401).json({ error: "Access Denied" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!);
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
};  

const receiptRouter = express.Router();
receiptRouter.use(verifyToken);

receiptRouter.get("/", verifyToken, receiptController.getReceipts);
receiptRouter.post("/", receiptController.createReceipt);
receiptRouter.put("/:id", receiptController.updateReceipt);
receiptRouter.delete("/:id", receiptController.deleteReceipt);

// ============= Route with receipt item controller ===============
receiptRouter.post("/:id", verifyToken, receiptItemController.createReceiptItem)



export default receiptRouter;

