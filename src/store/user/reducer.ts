import { SupportTicket } from "../../models/SupportTicket";
import { sortTickets } from "../../utilities/utilities";
import { ActionType, UserAction } from "../actions"
import { AppDataPayload } from "../appdata"

export interface UserState {
    error: string;
    count: number;
    username: string;
    isLoggedIn: boolean;
    isAdmin: boolean;
    tickets: SupportTicket[];
}

const defaultState: UserState = {
    error: '',
    count: -1,
    username: '',
    isLoggedIn: false,
    isAdmin: false,
    tickets: []
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
        case UserAction.SET_TICKETS:
            const tickets = sortTickets(action.payload.tickets);
            state = {
                ...state,
                tickets: tickets
            };
            break;
    }
    return state;
}