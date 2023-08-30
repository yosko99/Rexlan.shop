/*
  Warnings:

  - You are about to drop the column `count` on the `Rating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "count",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
