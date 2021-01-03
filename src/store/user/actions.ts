import UserRequest from '../../models/UserRequest';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StoreAction, UserAction } from '../actions';
import { get, post } from '../../utilities/backend_client';

const setUserError = (message: string): StoreAction => {
    return { type: UserAction.SET_USER_ERROR, payload: { errorMessage: message } };
}

const isLoggedIn = (): StoreAction => {
    return { type: UserAction.SET_LOGIN_STATUS, payload: { isLoggedIn: true } }
}

const isNotLoggedIn = (): StoreAction => {
    return { type: UserAction.SET_LOGIN_STATUS, payload: { isLoggedIn: false } };
}

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
            const response: StoreAction = await post(request, path, isLoggedIn, setUserError);
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

export const logout = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/logout';
            const response: StoreAction = await get(path, isLoggedIn, setUserError);
            dispatch(response);
            resolve();
        });
    }
}