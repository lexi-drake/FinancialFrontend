import Frequency from "../models/Frequency";
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

export const getAmountAndTimes = (transaction: RecurringTransaction, frequencies: Frequency[], monthly: boolean): [number, string] =>
    monthly ? getTimesPerMonth(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount)
        : getTimesPerYear(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount);

export const getNumberOfTransactions = (lastTriggered: Date, frequencyId: string, frequencies: Frequency[], monthly: boolean): number =>
    monthly ? getTimesPerMonthFromLastTriggeredAndFrequency(lastTriggered, frequencyId, frequencies)
        : getTimesPerYearFromLastTriggeredAndFrequency(lastTriggered, frequencyId, frequencies)
