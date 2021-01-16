import UserRequest, { LoginResponse } from '../../models/UserRequest';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StoreAction, UserAction } from '../actions';
import { get, post } from '../../utilities/backend_client';

const setUserError = (message: string): StoreAction => {
    return { type: UserAction.SET_USER_ERROR, payload: { errorMessage: message } };
}

const setUserCount = (count: number): StoreAction => {
    return { type: UserAction.SET_USER_COUNT, payload: { userCount: count } };
}

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

const isLoggedIn = (response: LoginResponse): StoreAction => {
    return {
        type: UserAction.SET_LOGIN_STATUS,
        payload: {
            isLoggedIn: true,
            isAdmin: response.role === 'Admin',
            username: response.username
        }
    }
}

const isNotLoggedIn = (): StoreAction => {
    return { type: UserAction.SET_LOGIN_STATUS, payload: { username: '', isLoggedIn: false, isAdmin: false } };
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

const setLogout = (): StoreAction => {
    return { type: UserAction.SET_LOGOUT, payload: {} };
}

export const logout = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>(async (resolve) => {
            const path: string = 'user/logout';
            const response: StoreAction = await get(path, setLogout, setLogout);
            dispatch(response);
            resolve();
        });
    }
}

const isAdmin = (): StoreAction => {
    return { type: UserAction.SET_ADMIN_STATUS, payload: { isAdmin: true, isLoggedIn: true } };
}

const isNotAdmin = (): StoreAction => {
    return { type: UserAction.SET_ADMIN_STATUS, payload: { isAdmin: false, isLoggedIn: false } };
}

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