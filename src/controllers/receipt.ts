import receiptService from "../services/receipt.ts"
import dotenv from "dotenv";
dotenv.config();


const getReceipts = async (req, res) => {
    try {
        const query = req.query;
        const receipts = await receiptService.getReceipts(query);
        return res.status(201).json(receipts);
    } catch(error) {
        console.error("[ERROR] getReceipts controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const createReceipt = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const data = req.body;

        const created_receipt = await receiptService.createReceipt(userId, data);
        return res.status(201).json(created_receipt);
    } catch(error) {
        console.error("[ERROR] createReceipt controller: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateReceipt = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.user_id;
        const data = req.body;
        
        const updated_receipt = await receiptService.updateReceipt(id, userId, data);
        return res.status(201).json(updated_receipt);
    } catch (error) {
        console.error("[ERROR] updateReceipt controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteReceipt = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.user_id;
        
        const deleted_receipt = await receiptService.deleteReceipt(userId, id);
        return res.status(201).json(deleted_receipt)
    } catch (error) {
        console.error("[ERROR] deleteReceipt controller: ", error);
        res.status(500).json({ message: "Internal server error "});
    }
}

const receiptController = {
    getReceipts,
    createReceipt,
    updateReceipt,
    deleteReceipt,
}

export default receiptController;