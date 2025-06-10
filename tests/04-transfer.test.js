import { runCrudTests } from './base.test.js';

runCrudTests({
    modelName:'transfer',
    basePath: '/api/v1/transfers',
    createData:{
        "playerId": "036194a8-2e9d-451b-8579-f612bd4e62e2",
        "fromTeamId": "c186762f-9d43-4475-b3c3-ade62fb545ad",
        "toTeamId": "c186762f-9d43-4475-b3c3-ade62fb545ad",
        "fee": 50000000,
        "date": "2024-07-01T12:00:00Z",
        "transferType": "PERMANENT"
    },
    updateData:{
        "playerId": "036194a8-2e9d-451b-8579-f612bd4e62e2",
        "fee": 40000000,
        "date": "2024-07-01T12:00:00Z",
        "transferType": "LOAN"
    }
});