export interface LedgerEntry {
    id: string;
    category: string;
    description: string;
    amount: number;
    transactionTypeId: string;
    recurringTransactionId: string;
    transactionDate: string;
}

export interface LedgerEntryRequest {
    category: string;
    description: string;
    amount: number;
    transactionTypeId: string;
    recurringTransactionId: string;
    transactionDate: string;
}

export interface DateSpanRequest {
    start: Date;
    end: Date;
}