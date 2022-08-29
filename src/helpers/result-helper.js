import { ResultGenerator, BigSmallResultGenerator } from "sc-slot-rng-generator";

const symbolBetChoiceTable = {
    choices: [
        {
            name: "bar100",
            odds: 100,
            count: 4,
            canBet: true,
            relatedChoices: ["bar50", "bar25"],
        },
        {
            name: "bar50",
            odds: 50,
            count: 8,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "bar25",
            odds: 25,
            count: 16,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "tripleSeven",
            odds: 40,
            count: 15,
            canBet: true,
            relatedChoices: ["tripleSeven3"],
        },
        {
            name: "tripleSeven3",
            odds: 3,
            count: 200,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "star",
            odds: 30,
            count: 20,
            canBet: true,
            relatedChoices: ["star3"],
        },
        {
            name: "star3",
            odds: 3,
            count: 200,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "watermelon",
            odds: 20,
            count: 30,
            canBet: true,
            relatedChoices: ["watermelon3"],
        },
        {
            name: "watermelon3",
            odds: 3,
            count: 200,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "bell",
            odds: 20,
            count: 30,
            canBet: true,
            relatedChoices: ["bell3"],
        },
        {
            name: "bell3",
            odds: 3,
            count: 200,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "lemon",
            odds: 15,
            count: 40,
            canBet: true,
            relatedChoices: ["lemon3"],
        },
        {
            name: "lemon3",
            odds: 3,
            count: 200,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "orange",
            odds: 10,
            count: 60,
            canBet: true,
            relatedChoices: ["orange3"],
        },
        {
            name: "orange3",
            odds: 3,
            count: 200,
            canBet: false,
            relatedChoices: [],
        },
        {
            name: "cherry",
            odds: 5,
            count: 120,
            canBet: true,
            relatedChoices: ["cherry3"],
        },
        {
            name: "cherry3",
            odds: 3,
            count: 200,
            canBet: false,
            relatedChoices: [],
        },
    ],
};

const bigSmallBetChoiceTable = {
    choices: [
        {
            name: "big",
            odds: 2,
            count: 100,
            canBet: true,
            relatedChoices: [],
        },
        {
            name: "small",
            odds: 2,
            count: 100,
            canBet: true,
            relatedChoices: [],
        },
    ],
};
const generateResult = (ratio, extraMin, extraMax, mode = 1) => {
    const symbolGenerator = new ResultGenerator(symbolBetChoiceTable, { ratio, extraMin, extraMax }, mode);
    const symbolResult = symbolGenerator.generate();

    const bigSmallGenerator = new BigSmallResultGenerator(bigSmallBetChoiceTable, { ratio, extraMin, extraMax });
    const bigSmallResult = bigSmallGenerator.generate();

    return { result: { symbol: ["lucky", "bell"], bigSmall: bigSmallResult } };
    // return { result: { symbol: symbolResult, bigSmall: bigSmallResult } };
};

const getSettlementResult = (roundResult) => {
    let defaultSettlement = {
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

    roundResult.symbol.forEach((choice) => {
        defaultSettlement[choice] = true;
    });

    defaultSettlement[roundResult.bigSmall.choice] = true;

    console.log(JSON.stringify(defaultSettlement, null, 2));
    return defaultSettlement;
};

export { generateResult, getSettlementResult };
