import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import AdminRequest from "../../models/AdminRequest";
import { post } from "../../utilities/backend_client";
import { StoreAction, UserAction } from "../actions";

const logResponse = (response: any): StoreAction => {
    console.log(response);
    // This isn't being dispatched so it doesn't really matter.
    // Also this is a super temporary solution.
    return { type: UserAction.SET_ADMIN_STATUS, payload: {} };
}

export const makeAdminRequest = (path: string, description: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dsipatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const request: AdminRequest = { description: description };
            await post(request, `admin/${path}`, logResponse, logResponse);
            resolve();
        });
    }
}