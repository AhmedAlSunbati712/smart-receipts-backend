/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `category` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('GROCERIES', 'DINING', 'ENTERTAINMENT', 'TRANSPORTATION', 'RENT', 'UTILITIES', 'SHOPPING', 'HEALTHCARE', 'EDUCATION', 'TRAVEL', 'SUBSCRIPTIONS', 'INSURANCE', 'PERSONAL', 'GIFTS', 'OTHER');

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReceiptItem" DROP CONSTRAINT "ReceiptItem_receiptId_fkey";

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "category" "Category" NOT NULL,
ALTER COLUMN "rawText" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptItem" ADD CONSTRAINT "ReceiptItem_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
