import { runCrudTests } from './base.test.js';


runCrudTests({
    modelName:'team',
    basePath: '/api/v1/teams',
    createData:{
        name: "PSG",
        coach: "Dave Smith",
        stadium: "MCG Melbourne",
        leagueId: "0b700c10-27a3-4512-b919-c91bf8c1fb6e"
    },
    updateData:{
        name: "PSG",
        coach: "Dave Brown",
        stadium: "Dave's place"
    },
    filterField: "name",
    filterValue: "PSG",
    sortField: "stadium"
});