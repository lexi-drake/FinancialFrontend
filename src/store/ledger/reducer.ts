import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator";
import { LedgerEntry } from "../../models/LedgerEntry";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import SalaryType from "../../models/SalaryType";
import TransactionType from "../../models/TransactionType";
import { sortFrequencies, sortLedgerEntries } from "../../utilities/utilities";
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
    recurringTransactions: RecurringTransaction[];
}

const defaultState: LedgerState = {
    error: '',
    categories: [],
    frequencies: [],
    salaryTypes: [],
    transactionTypes: [],
    incomeGenerators: [],
    ledgerEntries: [],
    recurringTransactions: []
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
            categories.sort();
            state = {
                ...state,
                categories: categories
            };
            break;
        case LedgerAction.SET_FREQUENCIES:
            sortFrequencies(action.payload.frequencies);
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
            // TODO (alexa): the push actions are sort of outdated
            // now that the resources are reloaded from the backend
            // every time a new one is added. 
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
        case LedgerAction.SET_LEDGER_ENTRIES:
            sortLedgerEntries(action.payload.entries);
            state = {
                ...state,
                ledgerEntries: action.payload.entries
            };
            break;
        case LedgerAction.PUSH_LEDGER_ENTRY:
            state = {
                ...state,
                ledgerEntries: [...state.ledgerEntries, ...action.payload.entries]
            };
            break;
        case LedgerAction.PUSH_RECURRING_TRANSACTION:
            state = {
                ...state,
                recurringTransactions: [...state.recurringTransactions, ...action.payload.recurringTransactions]
            };
            break;
        case LedgerAction.SET_RECURRING_TRANSACTIONS:
            state = {
                ...state,
                recurringTransactions: action.payload.recurringTransactions
            };
            break;
        case LedgerAction.DELETE_INCOME_GENERATOR:
            state = {
                ...state,
                incomeGenerators: []
            };
            break;
        case LedgerAction.DELETE_LEDGER_ENTRY:
            state = {
                ...state,
                ledgerEntries: []
            };
            break;
        case LedgerAction.DELETE_RECURRING_TRANSACTION:
            state = {
                ...state,
                recurringTransactions: []
            };
            break;
    }
    return state;
}