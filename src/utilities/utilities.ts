import Frequency from "../models/Frequency";
import { Message } from "../models/Message";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { SupportTicket } from "../models/SupportTicket";
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

export const sortFrequencies = (array: Frequency[]) =>
    array.sort((a, b) => {
        if (a.approxTimesPerYear > b.approxTimesPerYear) {
            return 1;
        } else if (b.approxTimesPerYear > a.approxTimesPerYear) {
            return -1;
        }
        return 0;
    });


export const getAmountAndTimes = (transaction: RecurringTransaction, frequencies: Frequency[], monthly: boolean): [number, string] =>
    monthly ? getTimesPerMonth(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount)
        : getTimesPerYear(transaction.lastTriggered, transaction.frequencyId, frequencies, transaction.amount);

export const getNumberOfTransactions = (lastTriggered: Date, frequencyId: string, frequencies: Frequency[], monthly: boolean): number =>
    monthly ? getTimesPerMonthFromLastTriggeredAndFrequency(lastTriggered, frequencyId, frequencies)
        : getTimesPerYearFromLastTriggeredAndFrequency(lastTriggered, frequencyId, frequencies)

const getMostRecentDate = (messages: Message[]): Date =>
    new Date(Math.max(...messages.map(x => x.createdDate.getTime())));

// Tickets are sorted by the most recent message sent, such that the 
// most recent appears first.
export const sortTickets = (tickets: SupportTicket[]): SupportTicket[] =>
    tickets.sort((a, b) => {
        const aDate = getMostRecentDate(a.messages);
        const bDate = getMostRecentDate(b.messages);
        if (aDate > bDate) {
            return -1;
        } else if (bDate > aDate) {
            return 1;
        }
        return 0;
    });

export const sortMessages = (messages: Message[]): Message[] =>
    messages.sort((a, b) => {
        if (a.createdDate > b.createdDate) {
            return -1;
        } else if (b.createdDate > a.createdDate) {
            return 1;
        }
        return 0;
    });

export const isNew = (message: Message, username: string): boolean => {
    return !message.opened && message.sentBy !== username;
}

export const checkValidAmount = (amount: string): boolean =>
    !!amount && isNaN(parseFloat(amount));