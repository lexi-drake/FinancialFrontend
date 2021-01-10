import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { get, post } from "../../utilities/backend_client";
import { LedgerAction, StoreAction } from "../actions";
import { Category, CategoryRequest } from '../../models/Category';
import Frequency from "../../models/Frequency";
import SalaryType from "../../models/SalaryType";
import TransactionType from "../../models/TransactionType";
import { IncomeGenerator, IncomeGeneratorRequest } from "../../models/IncomeGenerator";
import { DateSpanRequest, LedgerEntry, LedgerEntryRequest } from "../../models/LedgerEntry";

const setLedgerError = (message: string): StoreAction => {
    return { type: LedgerAction.SET_LEDGER_ERROR, payload: { errorMessage: message } };
}

const setCategories = (categories: Category[]): StoreAction => {
    return { type: LedgerAction.SET_CATEGORIES, payload: { categories: categories } };
}

export const getCategories = (partial: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/categories';
            const request: CategoryRequest = { partial: partial };
            const response: StoreAction = await post(request, path, setCategories, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const setFrequencies = (frequencies: Frequency[]): StoreAction => {
    return { type: LedgerAction.SET_FREQUENCIES, payload: { frequencies: frequencies } };
}

export const getFrequencies = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/frequencies';
            const response: StoreAction = await get(path, setFrequencies, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const setSalaryTypes = (types: SalaryType[]): StoreAction => {
    return { type: LedgerAction.SET_SALARY_TYPES, payload: { salaryTypes: types } };
}

export const getSalaryTypes = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/salarytypes';
            const response: StoreAction = await get(path, setSalaryTypes, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const setTransactionTypes = (types: TransactionType[]): StoreAction => {
    return { type: LedgerAction.SET_TRANSACTION_TYPES, payload: { transactionTypes: types } };
}

export const getTransactionTypes = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/transactiontypes';
            const response: StoreAction = await get(path, setTransactionTypes, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const pushIncomeGenerator = (generator: IncomeGenerator): StoreAction => {
    return { type: LedgerAction.PUSH_INCOME_GENERATOR, payload: { incomeGenerators: [generator] } };
}

export const addIncomeGenerator = (request: IncomeGeneratorRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/generator';
            const response: StoreAction = await post(request, path, pushIncomeGenerator, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const setIncomeGenerator = (generators: IncomeGenerator[]): StoreAction => {
    return { type: LedgerAction.SET_INCOME_GENERATORS, payload: { incomeGenerators: generators } };
}

export const getIncomeGenerators = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/generators';
            const response: StoreAction = await get(path, setIncomeGenerator, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const setLedgerEntries = (entries: LedgerEntry[]): StoreAction => {
    return {
        type: LedgerAction.SET_LEDGER_ENTRIES,
        payload: {
            entries: entries.map(x => {
                return {
                    ...x,
                    // Dates are parsed as strings by default.
                    transactionDate: new Date(x.transactionDate)
                }
            })
        }
    };
}

export const getLedgerEntries = (request: DateSpanRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const createPath = (): string => {
                const toMMDDYYYY = (date: Date): string => {
                    var month: string = (date.getMonth() + 1).toString().padStart(2, '0');
                    var day: string = date.getDate().toString().padStart(2, '0');
                    var year: string = date.getFullYear().toString();
                    return month + day + year;
                }
                return `ledger/${toMMDDYYYY(request.start)}/${toMMDDYYYY(request.end)}`
            }
            const response: StoreAction = await get(createPath(), setLedgerEntries, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const pushLedgerEntry = (entry: LedgerEntry): StoreAction => {
    entry.transactionDate = new Date(entry.transactionDate);
    return { type: LedgerAction.PUSH_LEDGER_ENTRY, payload: { entries: [entry] } };
}

export const addLedgerEntry = (request: LedgerEntryRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger';
            const response: StoreAction = await post(request, path, pushLedgerEntry, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}