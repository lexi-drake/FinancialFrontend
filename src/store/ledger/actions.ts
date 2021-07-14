import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { del, get, post } from "../../utilities/backend_client";
import { LedgerAction, StoreAction } from "../actions";
import Frequency from "../../models/Frequency";
import TransactionType from "../../models/TransactionType";
import { IncomeGenerator, IncomeGeneratorRequest } from "../../models/IncomeGenerator";
import { DateSpanRequest, LedgerEntry, LedgerEntryRequest } from "../../models/LedgerEntry";
import { RecurringTransaction, RecurringTransactionRequest } from "../../models/RecurringTransaction";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utilities/dates";
import { NULL_ACTION } from "../../utilities/constants";

const setLedgerError = (message: string): StoreAction => {
    return { type: LedgerAction.SET_LEDGER_ERROR, payload: { errorMessage: message } };
}

const setCategories = (categories: string[]): StoreAction => {
    return { type: LedgerAction.SET_CATEGORIES, payload: { categories: categories } };
}

export const clearCategories = (): ThunkAction<void, {}, {}, AnyAction> => dispatch =>
    dispatch(setCategories([]));

export const getCategories = (partial: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = `ledger/categories/${partial}`;
            const response: StoreAction = await get(path, setCategories, setLedgerError);
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

export const addIncomeGenerator = (request: IncomeGeneratorRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async () => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/generator';
            await post(request, path, NULL_ACTION, setLedgerError);
            resolve();
        });
    }
}

const setIncomeGenerators = (generators: IncomeGenerator[]): StoreAction => {
    generators = generators.map(g => {
        return {
            ...g,
            recurringTransactions: g.recurringTransactions.map(t => {
                return {
                    ...t,
                    lastExecuted: new Date(t.lastExecuted),
                    lastTriggered: new Date(t.lastTriggered)
                };
            })
        };
    });
    return { type: LedgerAction.SET_INCOME_GENERATORS, payload: { incomeGenerators: generators } };
}

export const getIncomeGenerators = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/generators';
            const response: StoreAction = await get(path, setIncomeGenerators, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

const setLedgerEntries = (entries: LedgerEntry[]): StoreAction => {
    return {
        type: LedgerAction.SET_LEDGER_ENTRIES,
        payload: {
            entries: entries.map(x => ({
                ...x,
                // Dates are parsed as strings by default.
                transactionDate: new Date(x.transactionDate)
            }))
        }
    };
}

export const getLedgerEntries = (request: DateSpanRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = `ledger/${request.start.getTime()}/${request.end.getTime()}`
            const response: StoreAction = await get(path, setLedgerEntries, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

export const addLedgerEntry = (request: LedgerEntryRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async () => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger';
            await post(request, path, NULL_ACTION, setLedgerError);
            resolve();
        });
    }
}


export const clearLedgerEntries = (): ThunkAction<void, {}, {}, AnyAction> => dispatch =>
    dispatch(setLedgerEntries([]));


const setRecurringTransactions = (transactions: RecurringTransaction[]): StoreAction =>
({
    type: LedgerAction.SET_RECURRING_TRANSACTIONS,
    payload: {
        recurringTransactions: transactions.map(x => {
            return {
                ...x,
                // Dates are parsed as strings by default.
                lastExecuted: new Date(x.lastExecuted),
                lastTriggered: new Date(x.lastTriggered)
            }
        })
    }
});

export const getRecurringTransactions = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/recurringtransactions';
            const response: StoreAction = await get(path, setRecurringTransactions, setLedgerError);
            dispatch(response);
            resolve();
        });
    }
}

export const addRecurringTransaction = (request: RecurringTransactionRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async () => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'ledger/recurringtransaction';
            await post(request, path, NULL_ACTION, setLedgerError);
            resolve();
        });
    }
}

export const deleteIncomeGenerator = (id: string): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> =>
        new Promise<void>(async (resolve) => {
            const path: string = `ledger/generator/${id}`;
            await del(path);
            dispatch(getIncomeGenerators());
            resolve();
        });

export const deleteLedgerEntry = (id: string): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> =>
        new Promise<void>(async (resolve) => {
            const path: string = `ledger/${id}`;
            await del(path);

            const now: Date = new Date();
            dispatch(getLedgerEntries({
                start: getFirstDayOfMonth(now.getFullYear(), now.getMonth()),
                end: getLastDayOfMonth(now.getFullYear(), now.getMonth())
            }));
            resolve();
        });


export const deleteRecurringTransaction = (id: string): ThunkAction<void, {}, {}, AnyAction> =>
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> =>
        new Promise<void>(async (resolve) => {
            const path: string = `ledger/recurringtransaction/${id}`;
            await del(path);
            dispatch(getRecurringTransactions());
            resolve();
        });
