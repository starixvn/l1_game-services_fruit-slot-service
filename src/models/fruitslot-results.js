import mongoose from "mongoose";
import { Core } from "sc-game-base";

const fruitSlotResults = mongoose.model(
    "fruitslot_results",
    new mongoose.Schema({
        ...Core.Models.ResultSchema,
        isAvailable: { type: Boolean, required: true },
    })
);

export default mongoose.model("fruitslot_results", fruitSlotResults);
