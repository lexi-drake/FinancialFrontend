import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { post } from "../../utilities/backend_client";
import { LedgerAction, StoreAction } from "../actions";
import CategoryRequest from '../../models/CategoryRequest';

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