export default class RoundResultConsumer {
    constructor(gameData, definition, roundResultPublisher, logService) {
        this.gameData = gameData;
        this.definition = definition;
        this.roundResultPublisher = roundResultPublisher;
        this.logService = logService;
    }

    generateResult() {
        const { gameConfigs } = this.gameData;
        const { randomMode } = gameConfigs;
        return this.definition.generateResult(0.5, 1, 2, randomMode);
    }

    getResultFromAdmin() {
        return [];
    }
}
