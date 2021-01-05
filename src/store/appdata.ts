import Frequency from "../models/Frequency";
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
    categories: string[];
    frequencies: Frequency[];
    salaryTypes: SalaryType[];
    transactionTypes: TransactionType[];
}