import { runCrudTests } from './base.test.js';
import { teamId1, teamId2, playerId } from '../utils/fetchTestIds.js';

runCrudTests({
    modelName:'transfer',
    basePath: '/api/v1/transfers',
    createData:{
        playerId: playerId,
        fromTeamId: teamId1,
        toTeamId: teamId2,
        fee: 50000000,
        date: "2024-07-01",
        transferType: "PERMANENT"
    },
    updateData:{
        playerId: playerId,
        fee: 40000000,
        date: "2024-07-01T00:00:00.000Z",
        transferType: "LOAN"
    },
    filterField: "playerId",
    filterValue: "0ecf54a9-b3ef-41a5-96b1-ca632ea623ff",
    sortField: "fee"
});