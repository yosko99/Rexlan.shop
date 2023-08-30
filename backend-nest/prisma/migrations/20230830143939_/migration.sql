/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_productId_userId_key" ON "Rating"("productId", "userId");
