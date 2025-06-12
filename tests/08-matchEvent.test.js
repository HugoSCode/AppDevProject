import { runCrudTests } from "./base.test.js";
import { matchId, playerId } from "../utils/fetchTestIds.js";
import { pl } from "date-fns/locale";
runCrudTests({
    modelName: 'matchEvent',
    basePath: '/api/v1/matchEvents',
    createData: {
        type: "Yellow Card",
        minute: 25,
        matchId: matchId,
        playerId: playerId,
        details: "Unclean tackle",
    },
    updateData: {
        minute: 26
    },
    filterField: "type",
    filterValue: "Yellow Card",
    sortField: "minute"
});