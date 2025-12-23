import prisma from "../db/prisma_client.ts";
import type { Prisma, Category, Receipt} from "@prisma/client";

type GetAnalyticsParams = {
    userId: string;
    startDate: Date;
}

const getAnalytics = async (data: GetAnalyticsParams) => {
    try {
        const receipts = await prisma.receipt.findMany({
            where: {
                userId: data.userId,
                date: {
                    gte: data.startDate,
                }
            },

            orderBy: {
                date: "asc"
            }
        });

        let spendingOverTime: {date: string, total: number}[] = [];
        let spendingByCategory: Partial<Record<Category, number>> = {};
        let spendingByVendor: Record<string,number> = {};
        for (const receipt of receipts) {
            /* ============ Processing spending by day ============ */
            const day = receipt.date.toISOString().split("T")[0];
            const last = spendingOverTime[spendingOverTime.length - 1];
            if (last && last.date == day) {
                spendingOverTime[spendingOverTime.length - 1].total += receipt.total;
            } else {
                spendingOverTime.push({
                    date: day,
                    total: receipt.total,
                });
            }

            /* ============= Processing vendor data =========== */
            const vendor = receipt.vendor;
            spendingByVendor[vendor] = (spendingByVendor[vendor] ?? 0) + receipt.total;

            /* ============= Processing category data =========== */
            const category = receipt.category;
            spendingByCategory[category] = (spendingByCategory[category] ?? 0) + receipt.total;
        }
        return {
            spendingOverTime,
            categorySpending: Object.entries(spendingByCategory).map(([category, total]) => ({
                category,
                total
            })),
            vendorSpending: Object.entries(spendingByVendor).map(([vendor, total]) => ({
                vendor,
                total
            }))
        }
    } catch (error) {
        console.log("[ERROR] getAnalytics service error: ", error);
        throw error;
    }
}


const analyticsService = {
    getAnalytics,
}

export default analyticsService;
