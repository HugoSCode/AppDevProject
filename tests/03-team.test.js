import { runCrudTests } from './base.test.js';


runCrudTests({
    modelName:'team',
    basePath: '/api/v1/teams',
    createData:{
        name: "Australia",
        coach: "Dave Smith",
        stadium: "MCG Melbourne"
    },
    updateData:{
        name: "Austrlian Socceroos",
        coach: "Dave Brown",
        stadium: "Dave's place"
    }
});