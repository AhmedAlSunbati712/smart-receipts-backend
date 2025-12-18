import jwt from "jsonwebtoken";
import express from "express";
import gptController from "../controllers/gpt.ts";

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

const gptRouter = express.Router();

gptRouter.post("/extract", gptController.extractReceiptInfo);

export default gptRouter;