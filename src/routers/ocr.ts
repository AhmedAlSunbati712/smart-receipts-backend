import ocrController from "../controllers/ocr.ts";
import express from "express";

const ocrRouter = express.Router();

ocrRouter.post("/", ocrController.addJob);
ocrRouter.get("/:id/status", ocrController.getJobStatus);
ocrRouter.get("/:id/result", ocrController.getJobResult);

export default ocrRouter;