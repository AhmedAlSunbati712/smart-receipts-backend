import orcController from "../controllers/orc.ts";
import express from "express";

const orcRouter = express.Router();

orcRouter.post("/", orcController.addJob);
orcRouter.get("/:id/status", orcController.getJobStatus);
orcRouter.get("/:id/result", orcController.getJobResult);

export default orcRouter;