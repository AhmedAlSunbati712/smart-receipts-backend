import express from "express";
import userController from "../controllers/user.ts"
import jwt from "jsonwebtoken";

const userRouter = express();

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

userRouter.get("/", userController.getUsers);
userRouter.post("/signup", userController.createUser);
userRouter.put("/:id", verifyToken, userController.updateUser);
userRouter.post("/login", userController.logIn)
export default userRouter;