import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { getNumberOfTransactions } from "./utilities";

export const transactionsWithoutGenerators = (recurringTransactions: RecurringTransaction[], generators: IncomeGenerator[]): RecurringTransaction[] => {
    const generatorTransactionIds: string[] = generators.map(x => x.recurringTransactions)
        .flat()
        .map(x => x.id);
    return recurringTransactions.filter(x => !generatorTransactionIds.includes(x.id))
        .sort((a, b) => {
            if (a.category > b.category) {
                return 1;
            } else if (b.category > a.category) {
                return -1;
            }
            return 0;
        });
}

export const getTotalRecurringTransactions = (recurringTransactions: RecurringTransaction[], frequencies: Frequency[], monthly: boolean): number => {
    if (recurringTransactions.length === 0) {
        return 0;
    }
    return recurringTransactions
        .map(x => getNumberOfTransactions(x.lastTriggered, x.frequencyId, frequencies, monthly) * (x.transactionType === 'Income' ? x.amount : -x.amount))
        .reduce((sum, x) => sum + x);
}