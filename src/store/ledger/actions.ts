import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { get, post } from "../../utilities/backend_client";
import { LedgerAction, StoreAction } from "../actions";
import CategoryRequest from '../../models/CategoryRequest';
import Frequency from "../../models/Frequency";
import SalaryType from "../../models/SalaryType";
import TransactionType from "../../models/TransactionType";

const setLedgerError = (message: string): StoreAction => {
    return { type: LedgerAction.SET_LEDGER_ERROR, payload: { errorMessage: message } };
}

const setCategories = (categories: string[]): StoreAction => {
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
    return { type: LedgerAction.SET_FREQUENCIES, payload: { salaryTypes: types } };
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
    return { type: LedgerAction.SET_FREQUENCIES, payload: { salaryTypes: types } };
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