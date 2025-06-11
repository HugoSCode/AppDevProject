import { runCrudTests } from "./base.test.js";

runCrudTests({
    modelName: 'playerStatistics',
    basePath: '/api/v1/matches',
    createData: {
        date: "2024-12-12",
        stadium: "Emirates Stadium",
        homeTeamId: "f1db8fb6-dabf-4b24-a579-985488c821fa",
        awayTeamId: "93cb5256-1458-4965-93a3-997ccd47b876",
        leagueId: "55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73",
        homeScore: 2,
        awayScore: 1

    },
    updateData: {
        date: "2023-05-03T16:00:00.000Z"

    }
});