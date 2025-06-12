import { runCrudTests } from "./base.test.js";
runCrudTests({
modelName: "teamStats",
basePath:"/api/v1/leagues",
createData:{
    name: "A league",
    country: "Australia"
},
updateData:{
country: "Australia & New Zealand"
},
filterField: "name",
filterValue: "Premier League",
sortField: "country"

});