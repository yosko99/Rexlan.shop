/*
  Warnings:

  - The primary key for the `ProductView` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductView` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ProductView` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `ProductView` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductView" DROP CONSTRAINT "ProductView_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "ProductView_productId_key" ON "ProductView"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductView_userId_key" ON "ProductView"("userId");
