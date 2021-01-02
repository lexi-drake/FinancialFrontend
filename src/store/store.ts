import createSagaMiddleware from 'redux-saga';
import thunkMiddlware from 'redux-thunk';
import rootReducer from './reducer';
import rootSaga from './saga';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { history } from './history';

const sagaMiddleware = createSagaMiddleware();
const store: Store<any, any> = createStore(
    rootReducer,
    compose(applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        thunkMiddlware
    ))
);
export default store;
sagaMiddleware.run(rootSaga);