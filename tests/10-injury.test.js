import { runCrudTests } from './base.test.js';

runCrudTests({
  modelName: 'injury',
  basePath: '/api/v1/injuries',
  createData: {
    playerId: "0ecf54a9-b3ef-41a5-96b1-ca632ea623ff",
    description: "Torn ACL",
    date: "2024-12-12",
    duration: 10,
  },
  updateData:{
    duration: 12,
    description: "Torn ACL and MCL"
  },

    filterField: "date",
    filterValue: "2025-07-10T00:00:00.000Z",
    sortField: "duration",
  
});


