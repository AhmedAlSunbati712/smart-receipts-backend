import express from "express";
import imageController from "../controllers/image.ts";
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

const imageRouter = express.Router();

imageRouter.post("/presigned", imageController.getPresignedUrl);
imageRouter.post("/signed", imageController.getSignedUrl);

export default imageRouter;