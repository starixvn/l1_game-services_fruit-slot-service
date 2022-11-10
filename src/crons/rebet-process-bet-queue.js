import { Crons } from "sc-rebet-mode";

export default class RebetProcessBetQueue extends Crons.TableProcessBetQueue {
    async insertBetLog(player, roundId, bet, rate) {
        Object.entries(bet.lastBet).forEach(async ([choice, amount]) => {
            const subChoices = this.definition.symbolBetChoiceTable.find((item) => item.name === choice)?.relatedChoices ?? [];

            const newBetLog = {
                uid: player.UID,
                name: player.profile.name,
                time: new Date(),
                choice: choice,
                subChoices,
                amount: amount,
                freeBet: bet.freeBet,
                clientSentTime: bet.clientSentTime,
                receivedTime: bet.receivedTime,
                roundId,
                rebet: true,
            };

            if (player.session) {
                newBetLog.siteId = player.session.siteId;
                newBetLog.currency = player.session.currencyName;
                newBetLog.rate = rate;
                newBetLog.operatorId = player.session.operatorId;
                newBetLog.playerId = player.session.playerId;
            }

            await this.betLogsRepository.create(newBetLog);
        });
    }
}
