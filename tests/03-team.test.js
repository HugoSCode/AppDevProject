import { runCrudTests } from './base.test.js';
import { leagueId } from '../utils/fetchTestIds.js';




runCrudTests({
    modelName:'team',
    basePath: '/api/v1/teams',
    createData:{
        name: "PSG",
        coach: "Dave Smith",
        stadium: "MCG Melbourne",
        leagueId: leagueId
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