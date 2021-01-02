import { ActionType, UserAction } from "../actions"
import { AppDataPayload } from "../appdata"

export interface UserState {
    error: string;
    isLoggedIn: boolean;
}

const defaultState: UserState = {
    error: '',
    isLoggedIn: false,
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
            state = {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            }
            break;
    }
    return state;
}