import { ResultGenerator, BigSmallResultGenerator } from "sc-slot-rng-generator";
import { symbolBetChoiceTable } from "../constants";

const generateResult = (ratio, extraMin, extraMax, mode = 1) => {
    const symbolGenerator = new ResultGenerator(symbolBetChoiceTable, { ratio, extraMin, extraMax }, mode);
    const symbolResult = symbolGenerator.generate();

    const bigSmallGenerator = new BigSmallResultGenerator(mode);
    const bigSmallResult = bigSmallGenerator.generate();

    // TO DO: remove hardcode for testing
    //return { result: { symbol: ["lucky", "bell3", "bar50"], bigSmall: bigSmallResult } };

    return { result: { symbol: symbolResult, bigSmall: bigSmallResult } };
};

const getSettlementResult = (roundResult) => {
    let initialSettlement = {
        bar: false,
        bar25: false,
        bar50: false,
        tripleSeven: false,
        tripleSeven3: false,
        watermelon: false,
        watermelon3: false,
        star: false,
        star3: false,
        bell: false,
        bell3: false,
        orange: false,
        orange3: false,
        lemon: false,
        lemon3: false,
        cherry: false,
        cherry3: false,
        lucky: false,
        big: false,
        small: false,
    };

    roundResult.symbol.forEach((choice) => (initialSettlement[choice] = true));
    initialSettlement[roundResult.bigSmall.choice] = true;

    return initialSettlement;
};

export { generateResult, getSettlementResult };
