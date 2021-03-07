import { Category } from "../models/Category";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { Message } from "../models/Message";
import { RecurringTransaction } from "../models/RecurringTransaction";
import SalaryType from "../models/SalaryType";
import { SupportTicket } from "../models/SupportTicket";
import TransactionType from "../models/TransactionType";
import { AdminState } from "./admin/reducer";
import { LedgerState } from "./ledger/reducer";
import { UserState } from "./user/reducer";

export interface AppDataState {
    router: any,
    ledger: LedgerState;
    user: UserState;
    admin: AdminState;
}

export interface AppDataPayload {
    errorMessage: string;
    userCount: number;
    username: string;
    isLoggedIn: boolean;
    isAdmin: boolean;
    categories: Category[];
    frequencies: Frequency[];
    salaryTypes: SalaryType[];
    transactionTypes: TransactionType[];
    incomeGenerators: IncomeGenerator[];
    entries: LedgerEntry[];
    recurringTransactions: RecurringTransaction[];
    tickets: SupportTicket[];
    messages: Message[];
}