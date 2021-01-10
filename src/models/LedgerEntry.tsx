export interface LedgerEntry {
    id: string;
    category: string;
    description: string;
    amount: number;
    transactionType: string;
    recurringTransactionId: string;
    transactionDate: Date;
}

export interface LedgerEntryRequest {
    category: string;
    description: string;
    amount: number;
    transactionTypeId: string;
    recurringTransactionId: string;
    transactionDate: Date;
}

export interface DateSpanRequest {
    start: Date;
    end: Date;
}