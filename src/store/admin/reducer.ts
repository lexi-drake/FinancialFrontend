import { SupportTicket } from "../../models/SupportTicket"
import { sortTickets } from "../../utilities/utilities"
import { ActionType, AdminAction } from "../actions"
import { AppDataPayload } from "../appdata"

export interface AdminState {
    tickets: SupportTicket[];
}

const defaultState: AdminState = {
    tickets: []
}

export const AdminReducer = (state: AdminState = defaultState, action: { type: ActionType, payload: AppDataPayload }) => {
    switch (action.type) {
        case AdminAction.SET_TICKETS:
            const tickets = sortTickets(action.payload.tickets);
            state = {
                ...state,
                tickets: tickets
            };
            break;
    }
    return state;
}