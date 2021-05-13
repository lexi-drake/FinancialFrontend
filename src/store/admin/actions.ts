import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AdminRequest, FrequencyRequest } from "../../models/AdminRequest";
import { MessageRequest } from "../../models/Message";
import { SupportTicket } from "../../models/SupportTicket";
import { get, patch, post } from "../../utilities/backend_client";
import { NULL_ACTION } from "../../utilities/constants";
import { sortMessages } from "../../utilities/utilities";
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
            tickets: tickets.map(x => ({
                ...x,
                messages: sortMessages(x.messages.map(m => ({
                    ...m,
                    createdDate: new Date(m.createdDate)
                }))),
                createdDate: new Date(x.createdDate)
            }
            ))
        }
    }
}

export const resolveTicket = (id: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = `admin/ticket/${id}/resolve`;
            const response: StoreAction = await patch({}, path, NULL_ACTION, logResponse);
            dispatch(response);
            resolve();
        });
    }
}