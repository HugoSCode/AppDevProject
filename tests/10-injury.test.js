import { runCrudTests } from './base.test.js';
import { playerId } from '../utils/fetchTestIds.js';
runCrudTests({
  modelName: 'injury',
  basePath: '/api/v1/injuries',
  createData: {
    playerId: playerId,
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


