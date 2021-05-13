import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { LedgerReducer } from "./ledger/reducer";
import { UserReducer } from "./user/reducer";
import { history } from "./history";

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ledger: LedgerReducer,
    user: UserReducer
});

const rootReducer = createRootReducer(history);
export default rootReducer;