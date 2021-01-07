export interface RecurringTransaction {
    id: string;
    category: string;
    description: string;
    amount: number;
    frequencyId: string;
    transactionTypeId: string;
}

export interface RecurringTransactionRequest {
    category: string;
    description: string;
    amount: number;
    frequencyId: string;
    transactionTypeId: string;
}