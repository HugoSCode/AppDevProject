/*
  Warnings:

  - The primary key for the `Injury` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `League` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Match` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MatchEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PlayerStatistic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeamStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transfer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Injury" DROP CONSTRAINT "Injury_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "MatchEvent" DROP CONSTRAINT "MatchEvent_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchEvent" DROP CONSTRAINT "MatchEvent_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerStatistic" DROP CONSTRAINT "PlayerStatistic_matchId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerStatistic" DROP CONSTRAINT "PlayerStatistic_playerId_fkey";

-- DropForeignKey
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_fromTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_toTeamId_fkey";

-- AlterTable
ALTER TABLE "Injury" DROP CONSTRAINT "Injury_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "playerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Injury_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Injury_id_seq";

-- AlterTable
ALTER TABLE "League" DROP CONSTRAINT "League_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "League_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "League_id_seq";

-- AlterTable
ALTER TABLE "Match" DROP CONSTRAINT "Match_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "homeTeamId" SET DATA TYPE TEXT,
ALTER COLUMN "awayTeamId" SET DATA TYPE TEXT,
ALTER COLUMN "leagueId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Match_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Match_id_seq";

-- AlterTable
ALTER TABLE "MatchEvent" DROP CONSTRAINT "MatchEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "matchId" SET DATA TYPE TEXT,
ALTER COLUMN "playerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MatchEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MatchEvent_id_seq";

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Player_id_seq";

-- AlterTable
ALTER TABLE "PlayerStatistic" DROP CONSTRAINT "PlayerStatistic_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "playerId" SET DATA TYPE TEXT,
ALTER COLUMN "matchId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlayerStatistic_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PlayerStatistic_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ALTER COLUMN "leagueId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TeamStats_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TeamStats_id_seq";

-- AlterTable
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "playerId" SET DATA TYPE TEXT,
ALTER COLUMN "fromTeamId" SET DATA TYPE TEXT,
ALTER COLUMN "toTeamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transfer_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchEvent" ADD CONSTRAINT "MatchEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchEvent" ADD CONSTRAINT "MatchEvent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStats" ADD CONSTRAINT "TeamStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStats" ADD CONSTRAINT "TeamStats_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_fromTeamId_fkey" FOREIGN KEY ("fromTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_toTeamId_fkey" FOREIGN KEY ("toTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Injury" ADD CONSTRAINT "Injury_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStatistic" ADD CONSTRAINT "PlayerStatistic_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStatistic" ADD CONSTRAINT "PlayerStatistic_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
