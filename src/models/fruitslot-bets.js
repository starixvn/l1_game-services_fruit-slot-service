import mongoose from "mongoose";

const temptBetSchema = {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    roundId: { type: Number, required: true },

    bar: { type: Number, default: 0 },
    tripleSeven: { type: Number, default: 0 },
    watermelon: { type: Number, default: 0 },
    star: { type: Number, default: 0 },
    bell: { type: Number, default: 0 },
    orange: { type: Number, default: 0 },
    lemon: { type: Number, default: 0 },
    cherry: { type: Number, default: 0 },
    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },

    totalAmount: { type: Number, default: 0 },
    thanhtoan: { type: Boolean, default: false },
    paid: { type: Boolean, default: false },
    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object, require: true },

    playerId: { type: Number, require: true },
    siteId: { type: String, require: true },
    freeBet: { type: Boolean, default: false },
};

const fruitSlotBets = mongoose.model(
    "fruitslot_bets",
    new mongoose.Schema({
        ...temptBetSchema,
        currency: { type: String, require: true },
        rate: { type: Number, require: true },
        operatorId: { type: String, require: true },
        partnerId: { type: String, require: true },
    })
);

const betLogsSchema = {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    roundId: { type: Number, required: true },

    amount: { type: Number, default: 0, require: true },
    choice: { type: String, require: true },
    subChoices: { type: Array, require: true },
    time: { type: Date },
    clientSentTime: { type: Date },
    receivedTime: { type: Date },
    odds: { type: Object, require: true },

    playerId: { type: Number, require: true },
    operatorId: { type: String, require: true },
    siteId: { type: String, require: true },
    freeBet: { type: Boolean, default: false },
};

const fruitSlotTemptBets = mongoose.model("fruitslot_tempbets", new mongoose.Schema(temptBetSchema));
const fruitSlotBetLogs = mongoose.model("fruitslot_betlogs", betLogsSchema);

export { fruitSlotTemptBets, fruitSlotBets, fruitSlotBetLogs };
