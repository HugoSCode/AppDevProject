-- DropForeignKey
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_leagueId_fkey";

-- AlterTable
ALTER TABLE "TeamStats" ALTER COLUMN "leagueId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamStats" ADD CONSTRAINT "TeamStats_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;
