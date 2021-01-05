import Frequency from "../../models/Frequency";
import SalaryType from "../../models/SalaryType";
import TransactionType from "../../models/TransactionType";
import { ActionType, LedgerAction } from "../actions"
import { AppDataPayload } from "../appdata"

export interface LedgerState {
    error: string;
    categories: string[];
    frequencies: Frequency[];
    salaryTypes: SalaryType[];
    transactionTypes: TransactionType[];
}

const defaultState: LedgerState = {
    error: '',
    categories: [],
    frequencies: [],
    salaryTypes: [],
    transactionTypes: []
};

// TODO (alexa): handle setting ledger store state.
export const LedgerReducer = (state: LedgerState = defaultState, action: { type: ActionType, payload: AppDataPayload }) => {
    switch (action.type) {
        case LedgerAction.SET_LEDGER_ERROR:
            state = {
                ...state,
                error: action.payload.errorMessage
            };
            break;
        case LedgerAction.SET_CATEGORIES:
            break;
        case LedgerAction.SET_FREQUENCIES:
            break;
        case LedgerAction.SET_SALARY_TYPES:
            break;
        case LedgerAction.SET_TRANSACTION_TYPES:
            break;
    }
    return state;
}