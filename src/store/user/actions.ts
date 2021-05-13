import UserRequest, { LoginResponse } from '../../models/UserRequest';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StoreAction, UserAction } from '../actions';
import { del, get, patch, post, put } from '../../utilities/backend_client';
import { AxiosError } from 'axios';
import { SubmitTicketRequest, SupportTicket } from '../../models/SupportTicket';
import { NULL_ACTION } from '../../utilities/constants';
import { MessageRequest } from '../../models/Message';

const setUserError = (error: AxiosError): StoreAction => {
    if (!error.response) {
        return { type: UserAction.SET_USER_ERROR, payload: { errorMessage: 'Unknown error' } };
    }
    const getErrorMessage = (code: number, data: any): string => {
        const getValidationError = (data: any): string => {
            const passwordErrors: string[] = data.errors.Password ?? [];
            const usernameErrors: string[] = data.errors.Username ?? [];
            return `${passwordErrors.join(' ')} ${usernameErrors.join(' ')}`.trim();
        }
        switch (code) {
            case 400: return getValidationError(data);
            case 404: return 'Incorrect username or password';
            case 500: return 'Something went wrong. Try again soon';
            default: return 'Unknown error'
        }
    }

    return {
        type: UserAction.SET_USER_ERROR,
        payload: {
            errorMessage: getErrorMessage(error.response?.status, error.response?.data)
        }
    };
}

export const clearUserError = (): ThunkAction<void, {}, {}, AnyAction> => dispatch =>
    dispatch({ type: UserAction.SET_USER_ERROR, payload: { errorMessage: '' } });

const setUserCount = (count: number): StoreAction => ({ type: UserAction.SET_USER_COUNT, payload: { userCount: count } });

export const getUserCount = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user';
            const response: StoreAction = await get(path, setUserCount, setUserError);
            dispatch(response);
            resolve();
        });
    }
}

const isLoggedIn = (response: LoginResponse): StoreAction => ({
    type: UserAction.SET_LOGIN_STATUS,
    payload: {
        isLoggedIn: true,
        isAdmin: response.role === 'Admin',
        username: response.username
    }
});

const isNotLoggedIn = (): StoreAction => ({ type: UserAction.SET_LOGIN_STATUS, payload: { username: '', isLoggedIn: false, isAdmin: false } });

export const createUser = (request: UserRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/create';
            const response: StoreAction = await post(request, path, isLoggedIn, setUserError);
            dispatch(response);
            resolve();
        });
    }
}

export const login = (request: UserRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/login';
            const response: StoreAction = await put(request, path, isLoggedIn, setUserError);
            dispatch(response);
            resolve();
        });
    }
}

export const checkLoggedIn = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/login';
            const response: StoreAction = await get(path, isLoggedIn, isNotLoggedIn);
            dispatch(response);
            resolve();
        });
    }
}

const setLogout = (): StoreAction => ({ type: UserAction.SET_LOGOUT, payload: {} });

export const logout = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/logout';
            await del(path);
            dispatch(setLogout());
            resolve();
        });
    }
}

const isAdmin = (): StoreAction => ({ type: UserAction.SET_ADMIN_STATUS, payload: { isAdmin: true, isLoggedIn: true } });
const isNotAdmin = (): StoreAction => ({ type: UserAction.SET_ADMIN_STATUS, payload: { isAdmin: false, isLoggedIn: false } });

export const checkAdmin = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'admin';
            const response: StoreAction = await get(path, isAdmin, isNotAdmin);
            dispatch(response);
            resolve();
        });
    }
}

export const submitTicket = (request: SubmitTicketRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/ticket';
            await post(request, path, NULL_ACTION, setUserError);
            resolve();
        });
    }
}

const setTickets = (tickets: SupportTicket[]): StoreAction => ({
    type: UserAction.SET_TICKETS,
    payload: {
        tickets: tickets.map(x => ({
            ...x,
            createdDate: new Date(x.createdDate)
        }))
    }
});

export const getTickets = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/tickets';
            const response: StoreAction = await get(path, setTickets, setUserError);
            dispatch(response);
            resolve();
        });
    }
}

export const submitMessage = (request: MessageRequest): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/message';
            const response: StoreAction = await patch(request, path, NULL_ACTION, setUserError);
            dispatch(response);
            resolve();
        });
    }
}