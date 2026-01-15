/*
  Warnings:

  - You are about to drop the column `fileName` on the `Score` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "fileName",
ADD COLUMN     "filePath" TEXT;
