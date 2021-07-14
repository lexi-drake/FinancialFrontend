import ReactDOM from 'react-dom';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store from './store/store';
import { history } from './store/history';

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
