import { Message } from "../../models/Message";
import { sortMessages } from "../../utilities/utilities";
import { ActionType, UserAction } from "../actions"
import { AppDataPayload } from "../appdata"

export interface UserState {
    error: string;
    count: number;
    username: string;
    isLoggedIn: boolean;
    isAdmin: boolean;
    messages: Message[];
}

const defaultState: UserState = {
    error: '',
    count: -1,
    username: '',
    isLoggedIn: false,
    isAdmin: false,
    messages: []
}

export const UserReducer = (state: UserState = defaultState, action: { type: ActionType, payload: AppDataPayload }) => {
    switch (action.type) {
        case UserAction.SET_USER_ERROR:
            state = {
                ...state,
                error: action.payload.errorMessage
            };
            break;
        case UserAction.SET_USER_COUNT:
            state = {
                ...state,
                count: action.payload.userCount
            };
            break;
        case UserAction.SET_LOGIN_STATUS:
            state = {
                ...state,
                username: action.payload.username,
                isLoggedIn: action.payload.isLoggedIn,
                isAdmin: action.payload.isAdmin
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
        case UserAction.SET_MESSAGES:
            const messages = sortMessages(action.payload.messages);
            state = {
                ...state,
                messages: messages
            };
            break;
    }
    return state;
}