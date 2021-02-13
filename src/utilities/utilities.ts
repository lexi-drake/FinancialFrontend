import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { getTimesPerMonth, getTimesPerMonthFromLastTriggeredAndFrequency, getTimesPerYear, getTimesPerYearFromLastTriggeredAndFrequency } from './dates';

const REDIRECT_PATH = 'RedirectPath';

export const getRedirectPath = (): string => {
    const path = sessionStorage.getItem(REDIRECT_PATH);
    return path ? path : '';
}

export const setRedirectPath = (value: string) => {
    sessionStorage.setItem(REDIRECT_PATH, value);
}

export const clearRedirectPath = () => {
    sessionStorage.removeItem(REDIRECT_PATH);
}

export const selectUnique = (array: string[]): string[] => {
    return array.filter((v, i, self) => self.indexOf(v) === i);
}

export const sortFrequencies = (array: Frequency[]) => {
    array.sort((a, b) => {
        if (a.approxTimesPerYear > b.approxTimesPerYear) {
            return 1;
        }
        if (b.approxTimesPerYear > a.approxTimesPerYear) {
            return -1;
        }
        return 0;
    });
}

export const sortLedgerEntries = (array: LedgerEntry[]) => {
    array.sort((a, b) => {
        if (a.transactionDate > b.transactionDate) {
            return -1;
        }
        if (b.transactionDate > a.transactionDate) {
            return 1;
        }
        return 0;
    });
}

export const getAmountAndTimes = (transaction: RecurringTransaction, frequencies: Frequency[], monthly: boolean): [number, string] =>
    monthly ? getTimesPerMonth(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount)
        : getTimesPerYear(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount);

export const getNumberOfTransactions = (lastTriggered: Date, frequencyId: string, frequencies: Frequency[], monthly: boolean): number =>
    monthly ? getTimesPerMonthFromLastTriggeredAndFrequency(lastTriggered, frequencyId, frequencies)
        : getTimesPerYearFromLastTriggeredAndFrequency(lastTriggered, frequencyId, frequencies)


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

export const transactionsWithoutGenerators = (recurringTransactions: RecurringTransaction[], generators: IncomeGenerator[]): RecurringTransaction[] => {
    const generatorTransactionIds: string[] = generators.map(x => x.recurringTransactions)
        .flat()
        .map(x => x.id);
    return recurringTransactions.filter(x => !generatorTransactionIds.includes(x.id));
}