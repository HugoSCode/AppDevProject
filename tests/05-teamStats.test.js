import { runCrudTests } from "./base.test.js";

runCrudTests({
modelName: "teamStats",
basePath:"/api/v1/teamStats",
createData:{
    teamId: "2fcfb99a-0089-4bc0-96fd-df424e665e1e",
    leagueId: "55dba6a4-fa2c-4e60-92f3-bccb5bc7fb73",
    wins: 10,
    draws: 5,
    losses: 3,
    points: 35
},
updateData:{
    teamId: "2fcfb99a-0089-4bc0-96fd-df424e665e1e",
    wins: 11,
    draws: 5,
    points: 37 
}
});