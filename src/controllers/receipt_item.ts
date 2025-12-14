import receiptItemService from "../services/receipt_item.ts";

const createReceiptItem = async (req, res) => {
    try {
        const data = req.body;
        const receiptId = req.params.receiptId;

        const created_receiptItem = await receiptItemService.createReceiptItem(receiptId, data);
        res.status(201).json(created_receiptItem);
    } catch (error) {
        console.log("[ERROR] createReceiptItem controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }

}

const getReceiptItem = async (req, res) => {
    try {
        const query = req.query;
        const receiptItems = await receiptItemService.getReceiptItem(query);
        res.status(200).json(receiptItems);
    } catch (error) {
        console.log("[ERROR] getReceiptItem controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const updateReceiptItem = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const updated_receiptItem = await receiptItemService.updateReceiptItem(id, data);
        res.status(200).json(updated_receiptItem);
    } catch (error) {
        console.log("[ERROR] updateReceiptItem controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const deleteReceiptItem = async (req, res) => {
    try {
        const id = req.params.id;
        
        const deleted_receiptItem = await receiptItemService.deleteReceiptItem(id);
        res.status(201).json(deleted_receiptItem);
    } catch (error) {
        console.log("[ERROR] deleteReceiptItem controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const receiptItemController = {
    createReceiptItem,
    getReceiptItem,
    updateReceiptItem,
    deleteReceiptItem
}

export default receiptItemController;