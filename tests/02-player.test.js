import { runCrudTests } from './base.test.js';

runCrudTests({
  modelName: 'player',
  basePath: '/api/v1/players',
  createData: {
    name: "Lionel Messi",
    age: 36,
    nationality: "Argentina",
    position: "FORWARD"
  },
  updateData:{
    name: "Leo Messi",
    age: 37,
    nationality: "Argentina",
    position: "FORWARD"
  }
});