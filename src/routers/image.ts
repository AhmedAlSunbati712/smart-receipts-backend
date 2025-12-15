import express from "express";
import imageController from "../controllers/image.ts";
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

const imageRouter = express.Router();

imageRouter.post("/presigned", imageController.getPresignedUrl);
imageRouter.post("/signed", imageController.getSignedUrl);

export default imageRouter;