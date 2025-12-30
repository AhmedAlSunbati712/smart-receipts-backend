import prisma from "../db/prisma_client.ts";
import type { Prisma, Category, Receipt} from "@prisma/client";

type GetAnalyticsParams = {
    userId: string;
    startDate: Date;
}

type CategoryAnalytics = {
    category: Category;
    categorySpending: number;
    numReceipts: number;
    spendingOverTime: {date: string, total: number}[];
    spendingByVendor: Record<string, number>;
}
type VendorAnalytics = {
    vendor: string;
    vendorSpending: number;
    numReceipts: number;
    spendingOverTime: {date: string, total: number}[];
    spendingByCategory: Partial<Record<Category, number>>;
}

type GetCategoryAnalyticsParams = {
    userId: string;
    startDate: Date;
    endDate: Date;
}

type GetVendorAnalyticsParams = {
    userId: string;
    startDate: Date;
    endDate: Date;
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
        let numReceipts = 0;
        let spendingOverTime: {date: string, total: number}[] = [];
        let spendingByCategory: Partial<Record<Category, number>> = {};
        let spendingByVendor: Record<string,number> = {};
        for (const receipt of receipts) {
            numReceipts += 1
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
            numReceipts,
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

const getCategoryAnalytics = async (data: GetCategoryAnalyticsParams) => {
    try {
        const receipts = await prisma.receipt.findMany({
            where: {
                userId: data.userId,
                date: {
                    gte: data.startDate,
                    lte: data.endDate,
                },
            },
            orderBy: {
                date: "asc"
            }
        });

        let periodSpending = 0;

        // Initialize object
        let categoryAnalytics: Partial<Record<Category, CategoryAnalytics>> = {};

        for (const receipt of receipts) {
            const category = receipt.category;

            // Initialize if first time seeing this category
            if (!categoryAnalytics[category]) {
                categoryAnalytics[category] = {
                    category,
                    categorySpending: 0,
                    numReceipts: 0,
                    spendingOverTime: [],
                    spendingByVendor: {}
                };
            }

            // Update totals
            periodSpending += receipt.total;
            categoryAnalytics[category]!.numReceipts += 1;
            categoryAnalytics[category]!.categorySpending += receipt.total;

            /* ============ Processing spending by day ============ */
            const day = receipt.date.toISOString().split("T")[0];
            const last = categoryAnalytics[category]!.spendingOverTime[categoryAnalytics[category]!.spendingOverTime.length - 1]
            if (last && last.date == day) {
                categoryAnalytics[category]!.spendingOverTime[categoryAnalytics[category]!.spendingOverTime.length - 1].total += receipt.total;
            } else {
                categoryAnalytics[category]!.spendingOverTime.push({ date: day, total: receipt.total });
            }

            // Update vendor spending
            if (!categoryAnalytics[category]!.spendingByVendor[receipt.vendor]) {
                categoryAnalytics[category]!.spendingByVendor[receipt.vendor] = 0;
            }
            categoryAnalytics[category]!.spendingByVendor[receipt.vendor] += receipt.total;
        }

        // Convert to array
        const categories = Object.values(categoryAnalytics);

        return { periodSpending, categories };
    } catch (error) {
        console.log("[ERROR] getCategoryAnalytics service error: ", error);
        throw error;
    }
};

const getVendorAnalytics = async (data: GetVendorAnalyticsParams) => {
    try {
        const receipts = await prisma.receipt.findMany({
            where: {
                userId: data.userId,
                date: {
                    gte: data.startDate,
                    lte: data.endDate,
                }
            }
        });
        let vendorsRecord: Record<string, string> = {};
        let periodSpending = 0;
        let vendorAnalytics: Partial<Record<string, VendorAnalytics>> = {};
        for (const receipt of receipts) {
            const vendor = receipt.vendor.toLowerCase();
            vendorsRecord[vendor] = vendor;
            if (!vendorAnalytics[vendor]) {
                vendorAnalytics[vendor] = {
                    vendor,
                    vendorSpending: 0,
                    numReceipts: 0,
                    spendingOverTime: [],
                    spendingByCategory: {},
                };
            }
            vendorAnalytics[vendor]!.vendorSpending += receipt.total;
            vendorAnalytics[vendor]!.numReceipts += 1;

            // =========== Processing spending by day ==========
            const day = receipt.date.toISOString().split("T")[0];
            const last = vendorAnalytics[vendor]!.spendingOverTime[vendorAnalytics[vendor]!.spendingOverTime.length - 1];
            if (last && last.date == day) {
                vendorAnalytics[vendor]!.spendingOverTime[vendorAnalytics[vendor]!.spendingOverTime.length - 1].total += receipt.total
            } else {
                vendorAnalytics[vendor]!.spendingOverTime.push({date: day, total: receipt.total});
            }

            // ============ Processing spending by Category ========
            if (!vendorAnalytics[vendor]!.spendingByCategory[receipt.category]) {
                vendorAnalytics[vendor]!.spendingByCategory[receipt.category] = 0;
            }
            vendorAnalytics[vendor]!.spendingByCategory[receipt.category]! += receipt.total;

            periodSpending += receipt.total;
        }

        const vendors = Object.values(vendorAnalytics);
        return {periodSpending, vendorsRecord, vendors}
    } catch(error) {
        console.log("[ERROR] getVendorAnalyitcs service error: ", error);
        throw error;
    }
}

const analyticsService = {
    getAnalytics,
    getCategoryAnalytics,
    getVendorAnalytics
}

export default analyticsService;
