import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AdminRequest, FrequencyRequest } from "../../models/AdminRequest";
import { SupportTicket } from "../../models/SupportTicket";
import { get, post } from "../../utilities/backend_client";
import { AdminAction, StoreAction, UserAction } from "../actions";

const logResponse = (response: any): StoreAction => {
    console.log(response);
    // This isn't being dispatched so it doesn't really matter.
    // Also this is a super temporary solution.
    return { type: UserAction.SET_ADMIN_STATUS, payload: {} };
}

export const makeAdminRequest = (path: string, description: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const request: AdminRequest = { description: description };
            await post(request, `admin/${path}`, logResponse, logResponse);
            resolve();
        });
    }
}

export const submitFrequency = (request: FrequencyRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'admin/frequency';
            await post(request, path, logResponse, logResponse);
            resolve();
        });
    }
}

const setTickets = (tickets: SupportTicket[]): StoreAction => {
    return {
        type: AdminAction.SET_TICKETS,
        payload: {
            tickets: tickets.map(x => (
                {
                    ...x,
                    createdDate: new Date(x.createdDate)
                }
            ))
        }
    }
}

export const getTickets = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'admin/tickets';
            const response: StoreAction = await get(path, setTickets, logResponse);
            dispatch(response);
            resolve();
        });
    }
}