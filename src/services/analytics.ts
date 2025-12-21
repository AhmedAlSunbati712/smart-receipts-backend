import prisma from "../db/prisma_client.ts";
import type { Prisma, Category, Receipt} from "@prisma/client";


const getSpendingOverTime = async (userId: string) => {
    try {
        const receipts = await prisma.receipt.findMany({
            where: {userId},
            orderBy: {
                date: "asc",
            },
            select: {
                date: true,
                total: true,
            }
        });

        if (receipts.length === 0) return [];

        let spendingOverTime: {date: string, total: number}[] = [];
        for (const receipt of receipts) {
            const day = receipt.date.toISOString().split("T")[0];
            const last = spendingOverTime[spendingOverTime.length - 1];
            if (last && last.date == day) {
                spendingOverTime[spendingOverTime.length - 1].total += receipt.total;
                continue;
            }
            spendingOverTime.push({
                date: day,
                total: receipt.total,
            });
        }
        return spendingOverTime;
    } catch (error) {
        console.log("[ERROR] getSpendingOverTime service error: ", error);
        throw error;
    }
}

const getSpendingByCategory = async (userId: string) => {
    try {
        const receipts = await prisma.receipt.findMany({
            where: {userId},
            select: {
                category: true,
                total: true,
            }
        });

        let spendingByCategory: Partial<Record<Category, number>> = {};

        for (const receipt of receipts) {
            const category = receipt.category;
            spendingByCategory[category] =
                (spendingByCategory[category] ?? 0) + receipt.total;
        }

        return Object.entries(spendingByCategory).map(([category, total]) => ({
            category,
            total,
        }));

    } catch(error) {
        console.log("[ERROR] getSpendingByCategory service error: ", error);
        throw error;
    }
}

const getSpendingByVendor = async (userId: string) => {
    try {
        const receipts = await prisma.receipt.findMany({
            where: {userId},
            select: {
                vendor: true,
                total: true,
            }
        })

        let spendingByVendor: Partial<Record<string, number>> = {};
        for (const receipt of receipts) {
            const vendor = receipt.vendor;
            spendingByVendor[vendor] = (spendingByVendor[vendor] ?? 0) + receipt.total;
        }
        return Object.entries(spendingByVendor).map(([vendor, total]) => ({
            vendor,
            total,
        }));

    } catch (error) {
        console.log("[ERROR] getSpendingByVendor service error: ", error);
        throw error;
    }
}
const analyticsService = {
    getSpendingOverTime,
    getSpendingByCategory,
    getSpendingByVendor,
}

export default analyticsService;
