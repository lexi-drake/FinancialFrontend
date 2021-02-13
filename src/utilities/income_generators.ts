import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { getNumberOfTransactions } from "./utilities";

export const calculateIncome = (generator: IncomeGenerator, frequencies: Frequency[], monthly: boolean): number => {
    if (frequencies.length === 0 || generator.recurringTransactions.length === 0) {
        return 0;
    }

    const getAmountPerPeriod = (value: number, transactionType: string): number => {
        return transactionType === "Income" ? value : -value;
    }

    return generator.recurringTransactions
        .map(x => getAmountPerPeriod(x.amount, x.transactionType) * getNumberOfTransactions(generator.recurringTransactions[0].lastTriggered, generator.frequencyId, frequencies, monthly))
        .reduce((sum, x) => sum + x);
}


export const getTotalIncomeGenerators = (generators: IncomeGenerator[], frequencies: Frequency[], monthly: boolean): number => {
    if (generators.length === 0) {
        return 0;
    }
    return generators.map(x => calculateIncome(x, frequencies, monthly))
        .reduce((sum, x) => sum + x);
}