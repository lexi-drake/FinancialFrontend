import { ActionType } from "../actions"
import { AppDataPayload } from "../appdata"

interface AdminState {

}

const defaultState: AdminState = {

}

export const AdminReducer = (state: AdminState = defaultState, action: { type: ActionType, payload: AppDataPayload }) => {
    switch (action.type) {

    }
    return state;
}