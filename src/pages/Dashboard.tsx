import { push } from "connected-react-router";
import { connect } from "react-redux";
import CustomLink from "../components/custom/CustomLink";
import Header from "../components/custom/Header";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import IncomeGeneratorComponent from "../components/dashboard/IncomeGeneratorComponent";
import LedgerHistoryComponent from "../components/dashboard/LedgerHistoryComponent";
import RecurringTransactionComponent from "../components/dashboard/RecurringTransactionComponent";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { Message } from "../models/Message";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { AppDataState } from "../store/appdata";
import { getFrequencies, getIncomeGenerators, getLedgerEntries, getRecurringTransactions } from "../store/ledger/actions";
import { getMessages } from "../store/user/actions";
import { UsesFrequencies, UsesIncomeGenerators, UsesLedgerEntries, UsesMessages, UsesRecurringTransactions } from "../utilities/hooks";

interface DashboardProps {
    username: string;
    frequencies: Frequency[];
    ledgerEntries: LedgerEntry[];
    incomeGenerators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    messages: Message[];
    getLedgerEntries: typeof getLedgerEntries;
    getIncomeGenerators: typeof getIncomeGenerators;
    getRecurringTransactions: typeof getRecurringTransactions;
    getFrequencies: typeof getFrequencies;
    getMessages: typeof getMessages;
    push: typeof push;
}

const Dashboard = (props: DashboardProps) => {

    UsesFrequencies(props.frequencies, props.getFrequencies);
    UsesLedgerEntries(props.getLedgerEntries);
    UsesIncomeGenerators(props.getIncomeGenerators);
    UsesRecurringTransactions(props.getRecurringTransactions);
    UsesMessages(props.getMessages);

    const headline: string = `Welcome, ${props.username}`

    const messagesText = (): string => {
        if (props.messages.length === 0) {
            return 'Inbox';
        }

        const unopenedCount: number = props.messages.filter(x => !x.opened).length;
        return `You have ${unopenedCount} new messages.`
    }

    return (
        <DashboardContainer>
            <Header>
                <h1>{headline}</h1>
                <CustomLink onClick={() => props.push('/inbox')}>{messagesText()}</CustomLink>
            </Header>
            <LedgerHistoryComponent />
            <IncomeGeneratorComponent />
            <RecurringTransactionComponent />
        </DashboardContainer>
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
        frequencies: state.ledger.frequencies,
        ledgerEntries: state.ledger.ledgerEntries,
        incomeGenerators: state.ledger.incomeGenerators,
        recurringTransactions: state.ledger.recurringTransactions,
        messages: state.user.messages
    };
}

export default connect(mapStateToProps, { getLedgerEntries, getIncomeGenerators, getRecurringTransactions, getFrequencies, getMessages, push })(Dashboard as any);