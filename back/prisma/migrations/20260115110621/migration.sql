/*
  Warnings:

  - You are about to drop the column `filePath` on the `Score` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "filePath",
ADD COLUMN     "fileName" TEXT;
