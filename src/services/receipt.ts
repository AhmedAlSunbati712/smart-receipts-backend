import prisma from "../db/prisma_client.ts";
import type { Prisma, Category, Receipt} from "@prisma/client";

type CreateReceiptItemInput = {
    name: string;
    price: number;
    quantity: number;
};
  
interface CreateReceiptInput {
    vendor: string;
    category: Category;
    total: number;
    date: Date;
    items?: CreateReceiptItemInput[];
}
  
type UpdateReceiptInput = {
    vendor?: string;
    category?: Category;
    total?: number;
    date?: Date;
    rawText?: string | null;
    imageUrl?: string | null;
    
    createItems?: {
        name: string;
        price: number;
        quantity: number;
    }[];

    connectItemIds?: string[];
};

const createReceipt = async (userId: string, data: Omit<CreateReceiptInput, "user"> ) => {
    try {
        const { items, ...rest } = data;

        const created_receipt = await prisma.
        receipt.create({
            data: {
                ...rest,
                user: {
                    connect: {id: userId},
                },
                ...(data.items ? {
                    items: {
                        create: data.items,
                    }
                } : {}),
            },
            include: {items: true}
        });
        return created_receipt;

    } catch (error) {
        console.error("[ERROR] createReceipt service:", error);
        throw error;
    }
}

const updateReceipt = async (id: string, userId: string, data: UpdateReceiptInput) => {
    try {
        const {
            createItems,
            connectItemIds,
            ...receiptFields
          } = data;
        
        const updated_receipt = await prisma.receipt.update({
            where: {id, userId},
            data: {
                ...receiptFields,
                ...(createItems || connectItemIds
                    ? {
                        items: {
                          ...(createItems && { create: createItems }),
                          ...(connectItemIds && {
                            connect: connectItemIds.map(id => ({ id })),
                          }),
                        },
                      }
                    : {}),
            },
            include: { items: true },
        });
        return updated_receipt;
    } catch (error) {
        console.error("[ERROR] updateReceipt service:", error);
        throw error;
    }
}

const getReceipts = async (query: Partial<Receipt>) => {
    try {
        let receipts = await prisma.receipt.findMany({
            where: {...query},
            include: {items: true},
        });
        return receipts;
    } catch(error) {
        console.log("[ERROR] getReceipts service: ", error);
        throw error;
    }
}

const deleteReceipt = async (userId: string, id: string) => {
    try {
        const deleted_receipt = await prisma.receipt.delete({
            where: {id, userId},
        })
        return deleted_receipt;
    } catch(error) {
        console.log("[ERROR] getReceipts service: ", error);
        throw error;
    }
}

const receiptService = {
    createReceipt,
    updateReceipt,
    getReceipts,
    deleteReceipt,
}

export default receiptService;
