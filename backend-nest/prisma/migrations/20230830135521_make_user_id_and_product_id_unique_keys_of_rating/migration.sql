/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Rating_productId_userId_key" ON "Rating"("productId", "userId");
