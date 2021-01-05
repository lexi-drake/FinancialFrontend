import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { LedgerReducer } from "./ledger/reducer";
import { UserReducer } from "./user/reducer";
import { history } from "./history";
import { AdminReducer } from "./admin/reducer";

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ledger: LedgerReducer,
    user: UserReducer,
    admin: AdminReducer
});

const rootReducer = createRootReducer(history);
export default rootReducer;