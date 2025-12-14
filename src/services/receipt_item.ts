import prisma from "../db/prisma_client.ts";
import type { Prisma, ReceiptItem } from "@prisma/client";

type CreateReceiptInput = Prisma.ReceiptItemCreateInput;

const createReceiptItem = async (receiptId: string, data: Omit<CreateReceiptInput, "receipt">) => {
    try {
        const created_receiptItem = await prisma.receiptItem.create({
            data: {
                ...data,
                receiptId,
            }
        })
        return created_receiptItem;
    } catch (error) {
        console.log("[ERROR] createReceiptItem service: ", error);
        throw error;
    }
}

const getReceiptItem = async (query: Partial<ReceiptItem>) => {
    try {
        const receiptItems = await prisma.receiptItem.findMany({
            where: {
                ...query,
            }
        })
        return receiptItems;
    } catch (error) {
        console.log("[ERROR] getReceiptItem service: ", error);
        throw error;
    }
}

const updateReceiptItem = async (id: string, data: Partial<ReceiptItem>) => {
    try {
        const updated_receiptItem = await prisma.receiptItem.update({
            where: {id},
            data,
        })
    } catch (error) {
        console.log("[ERROR] updateReceiptItem service: ", error);
        throw error;
    }
}

const deleteReceiptItem = async (id: string) => {
    try {
        const deleted_receiptItem = prisma.receiptItem.delete({
            where: {id},
        })
        return deleted_receiptItem
    } catch(error) {
        console.log("[ERROR] deleteReceiptItem service: ", error);
        throw error;
    }
}

const receiptItemService = {
    createReceiptItem,
    getReceiptItem,
    updateReceiptItem,
    deleteReceiptItem,
}

export default receiptItemService;