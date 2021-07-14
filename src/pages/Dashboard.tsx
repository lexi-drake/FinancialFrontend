import { push } from "connected-react-router";
import { connect } from "react-redux";
import BudgetSummary from "../components/BudgetSummary";
import Footer from "../components/Footer";
import LedgerHistoryList from "../components/dashboard/LedgerHistoryList";
import RecurringTransactionList from '../components/dashboard/RecurringTransactionList';
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
import { useFrequencies, useIncomeGenerators, useLedgerEntries, useRecurringTransactions, useTickets, useTransactionTypes } from "../utilities/hooks";
import IncomeGeneratorList from "../components/dashboard/IncomeGeneratorList";
import TicketsList from "../components/TicketsList";
import TransactionType from "../models/TransactionType";
import AddIncomeGenerator from "../components/dashboard/AddIncomeGenerator";
import AddRecurringTransaction from "../components/dashboard/AddRecurringTransaction";
import AddLedgerEntry from "../components/dashboard/AddLedgerEntry";

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

    useFrequencies(props.frequencies, props.getFrequencies);
    useTransactionTypes(props.transactionTypes, props.getTransactionTypes);

    useLedgerEntries(props.getLedgerEntries);
    useIncomeGenerators(props.getIncomeGenerators);
    useRecurringTransactions(props.getRecurringTransactions);
    useTickets(props.getTickets);

    return (
        <div className="dashboard">
            <Navbar />
            <BudgetSummary />
            <TransactionHistoryVisualization />
            <Footer />
            <AddLedgerEntry />
            <LedgerHistoryList />
            <AddRecurringTransaction />
            <RecurringTransactionList />
            <AddIncomeGenerator />
            <IncomeGeneratorList />
            {/* <div className="page">
                This is where the buckets will go.
            </div> */}
            <TicketsList />
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