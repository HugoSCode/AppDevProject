import { runCrudTests } from "./base.test.js";

runCrudTests({
    modelName: 'matchEvent',
    basePath: '/api/v1/matchEvents',
    createData: {
        type: "Yellow Card",
        minute: 25,
        matchId: "95f2796b-0a07-455f-b635-4eba8b5d87b2",
        playerId: "4f63d3d3-026b-44b0-9435-12df2d07704b",
        details: "Unclean tackle",
    },
    updateData: {
        minute: 26
    }
});