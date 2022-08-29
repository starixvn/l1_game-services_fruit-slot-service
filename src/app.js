import { Core } from "sc-game-base";
import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import ContainerRegistry from "./container-registry";
import GameDefinition from "./game-definition";
import { generateResult, getSettlementResult } from "./helpers/result-helper";
import { GameData } from "./game-data";

export const run = async () => {
    const definition = new GameDefinition(gameSettings, generateResult, getSettlementResult);
    const gameData = new GameData(gameSettings.durations.wholeRound);
    const container = new ContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("Fruit Slot", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
