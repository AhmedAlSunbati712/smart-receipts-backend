import { raw } from "express";
import gptService from "../services/gpt.ts";


const extractReceiptInfo = async (req, res) => {
    try {
        const { rawText } = req.body;
        const receipt = await gptService.extractReceiptInfo(rawText);
        res.status(200).json(receipt);
    } catch (error) {
        console.error("[ERROR] extractReceiptInfo controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const gptController = {
    extractReceiptInfo,
}

export default gptController;