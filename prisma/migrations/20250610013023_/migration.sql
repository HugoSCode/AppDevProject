/*
  Warnings:

  - You are about to drop the `PlayerStatistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerStatistic" DROP CONSTRAINT "PlayerStatistic_matchId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerStatistic" DROP CONSTRAINT "PlayerStatistic_playerId_fkey";

-- DropTable
DROP TABLE "PlayerStatistic";

-- CreateTable
CREATE TABLE "PlayerStatistics" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "passes" INTEGER NOT NULL,
    "tackles" INTEGER NOT NULL,
    "saves" INTEGER NOT NULL,

    CONSTRAINT "PlayerStatistics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerStatistics" ADD CONSTRAINT "PlayerStatistics_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStatistics" ADD CONSTRAINT "PlayerStatistics_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
