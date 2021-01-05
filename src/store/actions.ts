import { AppDataPayload } from "./appdata";

export type ActionType = UserAction | LedgerAction | AdminAction;

export enum UserAction {
    SET_USER_ERROR = 'SET_USER_ERROR',
    SET_LOGIN_STATUS = 'SET_LOGIN_STATUS',
    SET_ADMIN_STATUS = 'SET_ADMIN_STATUS'
}

export enum LedgerAction {
    SET_LEDGER_ERROR = 'SET_LEDGER_ERROR',
    SET_CATEGORIES = 'SET_CATEGORIES',
}

export enum AdminAction {

}

export type StoreAction = { type: ActionType, payload: Partial<AppDataPayload> };