import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator";
import { LedgerEntry } from "../../models/LedgerEntry";
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
    incomeGenerators: IncomeGenerator[];
    ledgerEntries: LedgerEntry[];
}

const defaultState: LedgerState = {
    error: '',
    categories: [],
    frequencies: [],
    salaryTypes: [],
    transactionTypes: [],
    incomeGenerators: [],
    ledgerEntries: []
};

export const LedgerReducer = (state: LedgerState = defaultState, action: { type: ActionType, payload: AppDataPayload }) => {
    switch (action.type) {
        case LedgerAction.SET_LEDGER_ERROR:
            state = {
                ...state,
                error: action.payload.errorMessage
            };
            break;
        case LedgerAction.SET_CATEGORIES:
            const categories: string[] = action.payload.categories.map(x => x.category);
            state = {
                ...state,
                categories: categories
            };
            break;
        case LedgerAction.SET_FREQUENCIES:
            state = {
                ...state,
                frequencies: action.payload.frequencies
            };
            break;
        case LedgerAction.SET_SALARY_TYPES:
            state = {
                ...state,
                salaryTypes: action.payload.salaryTypes
            };
            break;
        case LedgerAction.SET_TRANSACTION_TYPES:
            state = {
                ...state,
                transactionTypes: action.payload.transactionTypes
            };
            break;
        case LedgerAction.PUSH_INCOME_GENERATOR:
            // This seems unneccessary, but it is required to change the reference
            // of state.incomeGenerators so that React will know when to handle
            // the state updating.
            const generators = [...state.incomeGenerators, ...action.payload.incomeGenerators];
            state = {
                ...state,
                incomeGenerators: generators
            };
            break;
        case LedgerAction.SET_INCOME_GENERATORS:
            state = {
                ...state,
                incomeGenerators: action.payload.incomeGenerators
            };
            break;
    }
    return state;
}