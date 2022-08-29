import { Core } from "sc-game-base";
import { initAPIStub, stubUserService } from "sc-game-service-integration-utils";

import appConfigs from "./app-configs.IGT";
import gameSettings from "./game-settings";
import ContainerRegistry from "../../../src/container-registry";
import GameDefinition from "../../../src/game-definition";
import { generateResult, getSettlementResult } from "../../../src/helpers/result-helper";
import { GameData } from "../../../src/game-data";

export const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    stubUserService(appConfigs);

    const definition = new GameDefinition(gameSettings, generateResult, getSettlementResult);
    const gameData = new GameData(gameSettings.durations.wholeRound);
    const container = new ContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("Fruit Slot", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
