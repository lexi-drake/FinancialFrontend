import { DateSpanRequest, LedgerEntry } from "../models/LedgerEntry";
import { getFirstDayOfMonth, getLastDayOfMonth } from "./dates";

export const sortLedgerEntries = (array: LedgerEntry[]) =>
    array.sort((a, b) => {
        if (a.transactionDate > b.transactionDate) {
            return -1;
        }
        if (b.transactionDate > a.transactionDate) {
            return 1;
        }
        return 0;
    });

export const getLedgerEntriesByMonth = (month: number, getLedgerEntries: (request: DateSpanRequest) => void) => {
    let date: Date = new Date();
    date = new Date(date.getFullYear(), date.getMonth() - month, date.getDate());
    getLedgerEntries({
        start: getFirstDayOfMonth(date.getFullYear(), date.getMonth()),
        end: getLastDayOfMonth(date.getFullYear(), date.getMonth())
    });
}
