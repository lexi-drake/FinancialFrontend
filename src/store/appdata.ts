import { Category } from "../models/Category";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import SalaryType from "../models/SalaryType";
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
    username: string;
    isLoggedIn: boolean;
    isAdmin: boolean;
    categories: Category[];
    frequencies: Frequency[];
    salaryTypes: SalaryType[];
    transactionTypes: TransactionType[];
    incomeGenerators: IncomeGenerator[];
    entries: LedgerEntry[];
}