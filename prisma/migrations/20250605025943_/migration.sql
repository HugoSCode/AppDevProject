/*
  Warnings:

  - You are about to drop the column `location` on the `Match` table. All the data in the column will be lost.
  - Added the required column `stadium` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "location",
ADD COLUMN     "stadium" TEXT NOT NULL;
