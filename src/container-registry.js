import awilix from "awilix";
import { Table, Core } from "sc-game-base";

import { fruitSlotRounds, fruitSlotTempBets, fruitSlotBets, fruitSlotBetLogs } from "./models";
import { SettleGameRoundConsumer } from "sc-slot-rng-game-base/src/consumers";
import { Bot } from "./crons";
import { GameCron, ProcessBetQueue } from "sc-slot-rng-game-base/src/crons";
import HistoryQuery from "sc-slot-rng-game-base/src/query-apis/history-query";
import RebetContainerRegistry from "./rebet-container-registry";
const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.container.register(new RebetContainerRegistry().registerTableGame(Core.Routers.BaseSocketRouter, ProcessBetQueue));

        return this.container;
    }

    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(fruitSlotRounds),
            betsRepository: asValue(fruitSlotBets),
            betLogsRepository: asValue(fruitSlotBetLogs),
            tempBetsRepository: asValue(fruitSlotTempBets),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
            gameCron: asClass(GameCron).singleton().proxy(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            settleGameRoundConsumer: asClass(SettleGameRoundConsumer).singleton().proxy(),
        });
    }

    registerApis() {
        super.registerApis();
        this.container.register({
            historyQuery: asClass(HistoryQuery).singleton(),
        });
    }
}
