import awilix from "awilix";
import { Table } from "sc-game-base";

import { fruitSlotRounds, fruitSlotTemptBets, fruitSlotBets, fruitSlotBetLogs } from "./models";
import { SettleGameRoundConsumer, PlaceBetConsumer, RoundResultConsumer } from "./consumers";
import { AdminSocketRouter, RoundResultPublisher } from "./publishers";
import { Crons, Consumers } from "./index";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
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
            gameCron: asClass(Crons.GameCron).singleton().proxy(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(PlaceBetConsumer).singleton(),
            settleGameRoundConsumer: asClass(SettleGameRoundConsumer).singleton().proxy(),
            roundResultConsumer: asClass(RoundResultConsumer).singleton(),
            inGameConsumer: asClass(Consumers.TableInGameConsumer).singleton(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            roundResultPublisher: asClass(RoundResultPublisher).singleton(),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            adminSocketRouter: asClass(AdminSocketRouter).proxy(),
        });
    }
}
