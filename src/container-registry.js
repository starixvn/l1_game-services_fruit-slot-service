import awilix from "awilix";
import { Table, Core } from "sc-game-base";

import { fruitSlotRounds, fruitSlotTemptBets, fruitSlotBets, fruitSlotBetLogs } from "./models";
import { SettleGameRoundConsumer } from "sc-slot-rng-game-base/src/consumers";
import { Bot } from "./crons";
import { GameCron } from "sc-slot-rng-game-base/src/crons";
import ProcessBetQueue from "sc-slot-rng-game-base/src/crons/process-bet-queue";
import HistoryQuery from "sc-slot-rng-game-base/src/query-apis/history-query";
import { RebetContainerRegistry } from "sc-rebet-mode";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    // register(appConfigs, definition, gameData) {
    //     super.register(appConfigs, definition, gameData);

    //     this.container.register(new RebetContainerRegistry().registerTableGame(Core.Routers.BaseSocketRouter, Crons.TableProcessBetQueue));

    //     return this.container;
    // }

    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(fruitSlotRounds),
            betsRepository: asValue(fruitSlotBets),
            betLogsRepository: asValue(fruitSlotBetLogs),
            tempBetsRepository: asValue(fruitSlotTemptBets),
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
