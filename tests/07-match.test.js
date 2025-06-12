import { runCrudTests } from "./base.test.js";
import { teamId1, teamId2, leagueId } from "../utils/fetchTestIds.js";
runCrudTests({
    modelName: 'match',
    basePath: '/api/v1/matches',
    createData: {
        date: "2024-12-12",
        stadium: "Emirates Stadium",
        homeTeamId: teamId1,
        awayTeamId: teamId2,
        leagueId: leagueId
    },
    updateData: {
        date: "2023-05-03T16:00:00.000Z"
    },

    filterField: "stadium",
    filterValue: "Emirates",
    sortField: "homeTeamId"
});