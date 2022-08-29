import { TableGameCron } from "sc-game-base/src/table/crons";

export default class GameCron extends TableGameCron {
    async proceed() {
        const { durations, luckySymbolAnimationTime, luckyRoundDuration } = this.definition;
        const { wholeRound, placingBets } = durations;
        const { numberOfLuckyRounds, remainingTime, disabled } = this.gameData;

        if (remainingTime === wholeRound) {
            await this.checkGameStatus();
        }

        if (!disabled) {
            // TO DO: remove console.log
            // console.log("\x1b[36m%s\x1b[0m", this.gameData.remainingTime);
            this.gameData.remainingTime--;
        }

        if (this.isStartingTime(remainingTime, durations)) {
            this.resetForNewRound();
            this.bot && (await this.bot.reset());
        }

        if (remainingTime < 0) {
            await this.settleGameRoundConsumer.settleRound(this.gameData);

            const extendedLuckyTime = numberOfLuckyRounds > 0 ? luckySymbolAnimationTime + numberOfLuckyRounds * luckyRoundDuration : 0;

            this.gameData.remainingTime = wholeRound + extendedLuckyTime;

            // TO DO: remove console.log
            // console.log("\x1b[33m%s\x1b[0m", this.gameData);
        } else if (remainingTime < placingBets) {
            this.bot && (await this.bot.run());
            this.runningRoundInfoPublisher.publish();
        }
    }
}
