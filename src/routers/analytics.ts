import analyticsController from "../controllers/analytics.ts";
import jwt from "jsonwebtoken";
import express from "express";

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

const analyticsRouter = express.Router();

// analyticsRouter.get("/spending", verifyToken, analyticsController.getSpendingOverTime);
// analyticsRouter.get("/category", verifyToken, analyticsController.getSpendingByCategory);
// analyticsRouter.get("/vendor", verifyToken, analyticsController.getSpendingByVendor);
analyticsRouter.get("/spending", analyticsController.getSpendingOverTime);
analyticsRouter.get("/category", analyticsController.getSpendingByCategory);
analyticsRouter.get("/vendor", analyticsController.getSpendingByVendor);
export default analyticsRouter;