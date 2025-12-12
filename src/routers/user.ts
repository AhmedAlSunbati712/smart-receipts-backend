import express from "express";
import userControllers from "../controllers/user.ts"

const userRouter = express();

userRouter.get("/", userControllers.getUsers);
userRouter.post("/", userControllers.createUser);
userRouter.put("/:id", userControllers.updateUser);

export default userRouter;