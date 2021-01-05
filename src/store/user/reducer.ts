import { ActionType, UserAction } from "../actions"
import { AppDataPayload } from "../appdata"

export interface UserState {
    error: string;
    username: string;
    isLoggedIn: boolean;
    isAdmin: boolean;
}

const defaultState: UserState = {
    error: '',
    username: '',
    isLoggedIn: false,
    isAdmin: false,
}

export const UserReducer = (state: UserState = defaultState, action: { type: ActionType, payload: AppDataPayload }) => {
    switch (action.type) {
        case UserAction.SET_USER_ERROR:
            state = {
                ...state,
                error: action.payload.errorMessage
            };
            break;
        case UserAction.SET_LOGIN_STATUS:
            // This action-type is dispatched by both login and checkLoggedIn,
            // so it really needs to handle two different situations: 1) a payload including 
            // a username & admin status and 2) a payload with only a login status.
            var updateOptionals: boolean = action.payload.username !== undefined && action.payload.isAdmin !== undefined;
            state = {
                ...state,
                username: updateOptionals ? action.payload.username : state.username,
                isLoggedIn: action.payload.isLoggedIn,
                isAdmin: updateOptionals ? action.payload.isAdmin : state.isAdmin
            };
            break;
        case UserAction.SET_ADMIN_STATUS:
            state = {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                isAdmin: action.payload.isAdmin
            };
            break;
        case UserAction.SET_LOGOUT:
            state = {
                ...state,
                username: '',
                isLoggedIn: false,
                isAdmin: false
            };
            break;
    }
    return state;
}