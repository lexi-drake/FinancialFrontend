import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { RecurringTransaction } from "../models/RecurringTransaction";
import SalaryType from "../models/SalaryType";
import { SupportTicket } from "../models/SupportTicket";
import TransactionType from "../models/TransactionType";
import { LedgerState } from "./ledger/reducer";
import { UserState } from "./user/reducer";

export interface AppDataState {
    router: any,
    ledger: LedgerState;
    user: UserState;
}

export interface AppDataPayload {
    errorMessage: string;
    userCount: number;
    username: string;
    isLoggedIn: boolean;
    isAdmin: boolean;
    categories: string[];
    frequencies: Frequency[];
    salaryTypes: SalaryType[];
    transactionTypes: TransactionType[];
    incomeGenerators: IncomeGenerator[];
    entries: LedgerEntry[];
    recurringTransactions: RecurringTransaction[];
    tickets: SupportTicket[];
}