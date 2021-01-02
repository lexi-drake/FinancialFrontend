import { ActionType } from "../actions"
import { AppDataPayload } from "../appdata"

export interface LedgerState {
    error: string;
}

const defaultState: LedgerState = {
    error: '',
}

export const LedgerReducer = (state: LedgerState = defaultState, action: { type: ActionType, payload: AppDataPayload }) => {
    switch (action.type) {

    }
    return state;
}