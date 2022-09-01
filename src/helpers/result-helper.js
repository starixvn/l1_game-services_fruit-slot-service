import { ResultGenerator, BigSmallResultGenerator } from "sc-slot-rng-generator";

const generateResult = (symbolBetChoiceTable, ratio, extraMin, extraMax, mode = 1) => {
    const symbolGenerator = new ResultGenerator(symbolBetChoiceTable, { ratio, extraMin, extraMax }, mode);
    const symbolResult = symbolGenerator.generate();

    const bigSmallGenerator = new BigSmallResultGenerator(mode);
    const bigSmallResult = bigSmallGenerator.generate();

    // TO DO: remove hardcode for testing
    //return { result: { symbol: ["lucky", "bell3", "bar50"], bigSmall: bigSmallResult } };

    return { result: { symbol: symbolResult, bigSmall: bigSmallResult } };
};

const getSettlementResult = (roundResult, initialSettlement) => {
    roundResult.symbol.forEach((choice) => (initialSettlement[choice] = true));
    initialSettlement[roundResult.bigSmall.choice] = true;

    return initialSettlement;
};

export { generateResult, getSettlementResult };
