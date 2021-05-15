import { Route, Router, Switch, withRouter } from 'react-router-dom';
import './App.css';
import './main.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { AppDataState } from './store/appdata';
import { connect } from 'react-redux';
import { history } from './store/history';
import { checkAdmin, checkLoggedIn } from './store/user/actions';
import PrivateRoute from './pages/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import AddIncomeGenerator from './pages/AddIncomeGenerator';
import AddLedgerEntry from './pages/AddLedgerEntry';
import AddRecurringTransaction from './pages/AddRecurringTransaction';
import About from './pages/About';
import Footer from './components/Footer';
import Support from './pages/Support.';
import TicketManagement from './components/admin/TicketManagement';
import Inbox from './pages/Inbox';

interface AppProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  checkLoggedIn: typeof checkLoggedIn;
  checkAdmin: typeof checkAdmin;
}

const App = (props: AppProps) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/dashboard/admin" component={AdminDashboard} {...props} admin />
        <PrivateRoute path="/dashboard" component={Dashboard} {...props} />
        <PrivateRoute path="/income/add" component={AddIncomeGenerator} {...props} />
        <PrivateRoute path="/ledger/add" component={AddLedgerEntry} {...props} />
        <PrivateRoute path="/transaction/add" component={AddRecurringTransaction} {...props} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/support" component={Support} {...props} />
        <PrivateRoute path="/inbox" component={Inbox} {...props} />
        <PrivateRoute path="/ticket/:id" component={TicketManagement} {...props} admin />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: AppDataState): Partial<AppProps> => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin
  };
}

export default withRouter(connect(mapStateToProps, { checkLoggedIn, checkAdmin })(App as any));
