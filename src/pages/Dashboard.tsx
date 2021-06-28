import { push } from "connected-react-router";
import { connect } from "react-redux";
import BudgetSummary from "../components/BudgetSummary";
import Footer from "../components/Footer";
import LedgerHistoryList from "../components/LedgerHistoryList";
import RecurringTransactionList from '../components/RecurringTransactionList';
import Navbar from "../components/Navbar";
import TransactionHistoryVisualization from "../components/TransactionHistoryVisualization";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { SupportTicket } from "../models/SupportTicket";
import { AppDataState } from "../store/appdata";
import { getFrequencies, getIncomeGenerators, getLedgerEntries, getRecurringTransactions, getTransactionTypes } from "../store/ledger/actions";
import { getTickets } from "../store/user/actions";
import { UsesFrequencies, UsesIncomeGenerators, UsesLedgerEntries, UsesRecurringTransactions, UsesTickets, UsesTransactionTypes } from "../utilities/hooks";
import IncomeGeneratorList from "../components/IncomeGeneratorList";
import TicketsList from "../components/TicketsList";
import TransactionType from "../models/TransactionType";
import AddLedgerEntry from "../components/AddLedgerEntry";
import AddRecurringTransaction from "../components/AddRecurringTransaction";

interface DashboardProps {
    username: string;
    frequencies: Frequency[];
    transactionTypes: TransactionType[];
    ledgerEntries: LedgerEntry[];
    incomeGenerators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    tickets: SupportTicket[];
    getLedgerEntries: typeof getLedgerEntries;
    getIncomeGenerators: typeof getIncomeGenerators;
    getRecurringTransactions: typeof getRecurringTransactions;
    getFrequencies: typeof getFrequencies;
    getTransactionTypes: typeof getTransactionTypes;
    getTickets: typeof getTickets;
    push: typeof push;
}

const Dashboard = (props: DashboardProps) => {

    UsesFrequencies(props.frequencies, props.getFrequencies);
    UsesTransactionTypes(props.transactionTypes, props.getTransactionTypes);

    UsesLedgerEntries(props.getLedgerEntries);
    UsesIncomeGenerators(props.getIncomeGenerators);
    UsesRecurringTransactions(props.getRecurringTransactions);
    UsesTickets(props.getTickets);

    const headline: string = `Welcome, ${props.username}`

    const messagesText = (): string => {
        if (props.tickets.length === 0) {
            return 'Inbox';
        }

        // TODO (alexa): this currently gives the number of tickets with unopened 
        // messages. This should, in the future, be updated to give the exact count
        // of messages.
        const unopenedCount: number = props.tickets.filter(x => x.messages.filter(y => !y.opened).length > 0).length;
        return `You have ${unopenedCount} new messages.`
    }

    return (
        <div className="dashboard">
            <div className="page">
                <Navbar />
                <BudgetSummary />
                <TransactionHistoryVisualization />
                <Footer />
            </div>
            <div className="page">
                <AddLedgerEntry />
                <LedgerHistoryList />
            </div>
            <div className="page">
                <AddRecurringTransaction />
                <RecurringTransactionList />
            </div>
            <div className="page">
                <IncomeGeneratorList />
            </div>
            {/* <div className="page">
                This is where the buckets will go.
            </div> */}
            <div className="page">
                <TicketsList />
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
        frequencies: state.ledger.frequencies,
        transactionTypes: state.ledger.transactionTypes,
        ledgerEntries: state.ledger.ledgerEntries,
        incomeGenerators: state.ledger.incomeGenerators,
        recurringTransactions: state.ledger.recurringTransactions,
        tickets: state.user.tickets
    };
}

export default connect(mapStateToProps, { getLedgerEntries, getIncomeGenerators, getRecurringTransactions, getFrequencies, getTickets, getTransactionTypes, push })(Dashboard as any);