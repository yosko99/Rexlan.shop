/*
  Warnings:

  - You are about to drop the column `userId` on the `ProductView` table. All the data in the column will be lost.
  - You are about to drop the column `viewedAt` on the `ProductView` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductView" DROP CONSTRAINT "ProductView_userId_fkey";

-- DropIndex
DROP INDEX "ProductView_userId_key";

-- AlterTable
ALTER TABLE "ProductView" DROP COLUMN "userId",
DROP COLUMN "viewedAt",
ALTER COLUMN "count" SET DEFAULT 1;
