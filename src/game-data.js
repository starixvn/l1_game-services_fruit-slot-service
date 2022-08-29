import { TableGameData } from "sc-game-base/src/table";

export class GameData extends TableGameData {
    constructor(remainingTime) {
        super(remainingTime);

        this.numberOfLuckyRound = 0;
    }
}
