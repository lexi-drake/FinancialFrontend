import { Redirect, Route, Router, Switch, withRouter } from 'react-router-dom';
import './App.css';
import './main.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { AppDataState } from './store/appdata';
import { connect } from 'react-redux';
import { history } from './store/history';

interface AppProps {

}

const App = (props: AppProps) => {

  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Landing} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: AppDataState): Partial<AppProps> => {
  return {};
}

export default withRouter(connect(mapStateToProps, {})(App as any));
