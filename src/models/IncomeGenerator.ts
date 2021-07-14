import { RecurringTransaction, RecurringTransactionRequest } from './RecurringTransaction';

export interface IncomeGenerator {
    id: string;
    description: string;
    frequencyId: string;
    recurringTransactions: RecurringTransaction[];
}

export interface IncomeGeneratorRequest {
    description: string;
    frequencyId: string;
    recurringTransactions: RecurringTransactionRequest[];
}