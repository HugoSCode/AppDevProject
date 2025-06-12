import { runCrudTests } from "./base.test.js";

runCrudTests({
    modelName: 'playerStatistics',
    basePath: '/api/v1/playerStatistics',
    createData: {
    playerId: "0ecf54a9-b3ef-41a5-96b1-ca632ea623ff",
    matchId: "02d661b1-b626-478a-81f3-003ec4fc61a0",
    goals: 0,
    assists: 1,
    passes: 38,
    tackles: 5,
    saves: 0
},
updateData:{
    playerId: "0ecf54a9-b3ef-41a5-96b1-ca632ea623ff",
    goals: 1
},
filterField: "matchId",
filterValue: "02d661b1-b626-478a-81f3-003ec4fc61a0",
sortField: "goals"
});