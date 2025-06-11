import { runCrudTests } from './base.test.js';

runCrudTests({
    modelName:'transfer',
    basePath: '/api/v1/transfers',
    createData:{
        "playerId": "0ecf54a9-b3ef-41a5-96b1-ca632ea623ff",
        "fromTeamId": "2fcfb99a-0089-4bc0-96fd-df424e665e1e",
        "toTeamId": "d9e8bc7a-0f84-43d1-9aca-6b555500fb31",
        "fee": 50000000,
        "date": "2024-07-01",
        "transferType": "PERMANENT"
    },
    updateData:{
        "playerId": "0ecf54a9-b3ef-41a5-96b1-ca632ea623ff",
        "fee": 40000000,
        "date": "2024-07-01T00:00:00.000Z",
        "transferType": "LOAN"
    }
});