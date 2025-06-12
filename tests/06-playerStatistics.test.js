import { runCrudTests } from "./base.test.js";
import { playerId, matchId } from "../utils/fetchTestIds.js";
runCrudTests({
    modelName: 'playerStatistics',
    basePath: '/api/v1/playerStatistics',
    createData: {
    playerId: playerId,
    matchId: matchId,
    goals: 0,
    assists: 1,
    passes: 38,
    tackles: 5,
    saves: 0
},
updateData:{
    goals: 1,
    assists: 0
},
filterField: "matchId",
filterValue: matchId,
sortField: "goals"
});