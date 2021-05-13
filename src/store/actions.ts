import { AppDataPayload } from "./appdata";

export type ActionType = UserAction | LedgerAction | NullAction;

export enum UserAction {
    SET_USER_ERROR = 'SET_USER_ERROR',
    SET_USER_COUNT = 'SET_USER_COUNT',
    SET_LOGIN_STATUS = 'SET_LOGIN_STATUS',
    SET_ADMIN_STATUS = 'SET_ADMIN_STATUS',
    SET_LOGOUT = 'SET_LOGOUT',
    SET_TICKETS = 'SET_TICKETS'
}

export enum LedgerAction {
    SET_LEDGER_ERROR = 'SET_LEDGER_ERROR',
    SET_CATEGORIES = 'SET_CATEGORIES',
    SET_FREQUENCIES = 'SET_FREQUENCIES',
    SET_SALARY_TYPES = 'SET_SALARY_TYPES',
    SET_TRANSACTION_TYPES = 'SET_TRANSACTION_TYPES',
    SET_INCOME_GENERATORS = 'SET_INCOME_GENERATORS',
    SET_LEDGER_ENTRIES = 'SET_LEDGER_ENTRIES',
    SET_RECURRING_TRANSACTIONS = 'SET_RECURRING_TRANSACTIONS'
}


export enum NullAction {
    NULL_ACTION = 'NULL_ACTION'
}

export type StoreAction = { type: ActionType, payload: Partial<AppDataPayload> };