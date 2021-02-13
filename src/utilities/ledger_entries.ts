import { LedgerEntry } from "../models/LedgerEntry";

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