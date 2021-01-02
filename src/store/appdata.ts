import { LedgerState } from "./ledger/reducer";
import { UserState } from "./user/reducer";

export interface AppDataState {
    router: any,
    ledger: LedgerState;
    user: UserState;
}

export interface AppDataPayload {
    errorMessage: string;
    isLoggedIn: boolean;
    categories: string[];
}