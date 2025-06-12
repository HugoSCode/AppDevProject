import { runCrudTests } from "./base.test.js";
import { teamId1, leagueId } from "../utils/fetchTestIds.js";
runCrudTests({
modelName: "teamStats",
basePath:"/api/v1/teamStats",
createData:{
    teamId: teamId1,
    leagueId: leagueId,
    wins: 10,
    draws: 5,
    losses: 3,
    points: 35
},
updateData:{
    teamId: teamId1,
    wins: 11,
    draws: 5,
    points: 37 
},
filterField: "teamId",
filterValue: teamId1,
sortField: "wins"
});