/*
  Warnings:

  - You are about to drop the column `storeId` on the `InventoryItemCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InventoryItemCategory" DROP CONSTRAINT "InventoryItemCategory_storeId_fkey";

-- AlterTable
ALTER TABLE "InventoryItemCategory" DROP COLUMN "storeId";
