import { Core } from "sc-game-base";
import { choiceNames, ratioModes, choicesTableCollection } from "../constants";

export default class SettleGameRoundConsumer extends Core.BaseEventConsumers.SettleGameRoundConsumer {
    constructor({ definition, gameData, roundResultPublisher, userBetResultPublisher, endGame, roundsRepository, betsRepository }) {
        super({ definition, gameData, roundResultPublisher, userBetResultPublisher, endGame, roundsRepository, betsRepository });
    }

    async generateResult() {
        const { gameConfigs } = this.gameData;
        const { randomMode, slotRNGConfig } = gameConfigs;
        const { luckySpinFrom, luckySpinTo, mode } = slotRNGConfig;

        const { result } = this.definition.generateResult(ratioModes[mode], luckySpinFrom, luckySpinTo, randomMode);
        const numberOfSymbols = result.symbol.length;
        this.gameData.numberOfLuckyRounds = numberOfSymbols === 1 ? 0 : numberOfSymbols - 1;

        return result;
    }

    calculateBetResult(settlementResult, bet, odds) {
        // TO DO: remove console.log
        // console.log("\x1b[33m%s\x1b[0m", JSON.stringify(settlementResult, null, 2));

        try {
            const betResult = Object.entries(settlementResult).reduce(
                (result, [subChoice, win]) => {
                    if (subChoice === choiceNames.lucky) {
                        return result;
                    }

                    const mainChoice = this.getMainchoice(subChoice);
                    const betAmount = bet[mainChoice];
                    const originalOdds = odds[subChoice] || 1;
                    const winAmount = win ? betAmount * originalOdds : 0;

                    result.totalBetAmount += betAmount;
                    result.totalWin += winAmount;
                    result.winningByChoices[mainChoice] = winAmount;

                    if (winAmount > 0) {
                        result.netWin += winAmount - betAmount;
                    } else {
                        result.totalLost += betAmount;
                    }

                    // TO DO: remove console.log
                    // console.log(`---------------------------`);
                    // console.log(`subChoice: ${subChoice}`);
                    // console.log(`mainChoice: ${mainChoice}`);
                    // console.log(JSON.stringify(result.winningByChoices, null, 2));

                    return result;
                },
                {
                    totalBetAmount: 0,
                    totalWin: 0,
                    netWin: 0,
                    totalLost: 0,
                    winningByChoices: {},
                }
            );

            betResult.totalWin = parseFloat(betResult.totalWin.toFixed(2));
            betResult.netWin = parseFloat(betResult.netWin.toFixed(2));

            return betResult;
        } catch (error) {
            // TO DO: remove console.log
            console.log(error);
        }
    }

    async settleRound() {
        try {
            const result = await this.generateResult();

            const settlementResult = this.definition.settle(result);
            const { roundId, exchangeRates } = this.gameData;

            const newRound = await this.roundsRepository.create({
                id: roundId,
                result: { symbol: result.symbol, number: result.bigSmall.value },
                settlementResult,
                time: new Date(),
                exchangeRateId: exchangeRates.exId,
            });

            if (newRound) {
                const finish = {
                    settlementResult,
                    result,
                    roundId: newRound.id,
                    time: newRound.time,
                };

                this.gameData.roundId = finish.roundId + 1;

                await this.settleBets(finish);
            }
        } catch (error) {
            // TO DO: remove console.log
            console.log(error);
        }
    }

    getMainchoice(choiceName) {
        const subChoice = choicesTableCollection.find((choice) => choice.relatedChoices.includes(choiceName));
        return subChoice ? subChoice.name : choiceName;
    }
}
