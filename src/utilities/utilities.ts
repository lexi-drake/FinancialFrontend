import Frequency from "../models/Frequency";
import { LedgerEntry } from "../models/LedgerEntry";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { getTimesPerMonth, getTimesPerYear } from './dates';

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
    monthly ?
        getTimesPerMonth(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount)
        : getTimesPerYear(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount);
