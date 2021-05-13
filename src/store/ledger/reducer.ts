import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator";
import { LedgerEntry } from "../../models/LedgerEntry";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import SalaryType from "../../models/SalaryType";
import TransactionType from "../../models/TransactionType";
import { sortLedgerEntries } from "../../utilities/ledger_entries";
import { transactionsWithoutGenerators } from "../../utilities/recurring_transactions";
import { sortFrequencies } from "../../utilities/utilities";
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
            state = {
                ...state,
                categories: action.payload.categories.sort()
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
        case LedgerAction.SET_INCOME_GENERATORS:
            state = {
                ...state,
                incomeGenerators: action.payload.incomeGenerators,
                recurringTransactions: transactionsWithoutGenerators(state.recurringTransactions, action.payload.incomeGenerators)
            };
            break;
        case LedgerAction.SET_LEDGER_ENTRIES:
            sortLedgerEntries(action.payload.entries);
            state = {
                ...state,
                ledgerEntries: action.payload.entries
            };
            break;
        case LedgerAction.SET_RECURRING_TRANSACTIONS:
            state = {
                ...state,
                recurringTransactions: transactionsWithoutGenerators(action.payload.recurringTransactions, state.incomeGenerators)
            };
            break;
    }
    return state;
}