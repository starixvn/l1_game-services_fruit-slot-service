import { Core } from "sc-game-base";

export default class GameCron extends Core.Crons.BaseGameCron {
    resetForNewRound() {
        super.resetForNewRound();

        this.gameData.chips = {};
        this.gameData.winningPlayers = {};
    }

    async proceed() {
        const { durations } = this.definition;

        if (this.gameData.remainingTime === durations.wholeRound) {
            await this.checkGameStatus();
        }

        if (!this.gameData.disabled) {
            console.log("\x1b[36m%s\x1b[0m", this.gameData.remainingTime);
            this.gameData.remainingTime--;
        }

        if (this.isStartingTime(this.gameData.remainingTime, durations)) {
            this.resetForNewRound();
            this.bot && (await this.bot.reset());
        }

        // if (this.gameData.remainingTime === durations.placingBets) {
        //     await this.roundResultConsumer.generateResultAndPublishHash();
        //     this.gameData.settlementResultFromAdmin = {};
        // }

        if (this.gameData.remainingTime < 0) {
            // this.gameData.remainingTime = durations.wholeRound;

            await this.settleGameRoundConsumer.settleRound(this.gameData);

            const extendLuckyTime =
                this.gameData.numberOfLuckyRound > 0
                    ? this.definition.luckySymbolAnimationTime + this.gameData.numberOfLuckyRound * this.definition.luckyRoundDuration
                    : 0;
            this.gameData.remainingTime = durations.wholeRound + extendLuckyTime;
            console.log("\x1b[33m%s\x1b[0m", this.gameData);
        } else if (this.gameData.remainingTime < durations.placingBets) {
            this.bot && (await this.bot.run());
            this.runningRoundInfoPublisher.publish();
        }
    }
}
