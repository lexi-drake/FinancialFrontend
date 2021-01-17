export interface RecurringTransaction {
    id: string;
    category: string;
    description: string;
    amount: number;
    frequencyId: string;
    transactionType: string;
    lastTriggered: Date;
    lastExecuted: Date;
}

export interface RecurringTransactionRequest {
    category: string;
    description: string;
    amount: number;
    frequencyId: string;
    transactionTypeId: string;
    lastTriggered: Date;
}