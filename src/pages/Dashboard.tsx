import { connect } from "react-redux";
import Header from "../components/custom/Header";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import IncomeGeneratorComponent from "../components/dashboard/IncomeGeneratorComponent";
import LedgerHistoryComponent from "../components/dashboard/LedgerHistoryComponent";
import RecurringTransactionComponent from "../components/dashboard/RecurringTransactionComponent";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { AppDataState } from "../store/appdata";
import { getFrequencies, getIncomeGenerators, getLedgerEntries, getRecurringTransactions } from "../store/ledger/actions";
import { MONTHS } from "../utilities/constants";
import { UsesFrequencies, UsesIncomeGenerators, UsesLedgerEntries, UsesRecurringTransactions } from "../utilities/hooks";
import { calculateIncome, getNumberOfTransactions, transactionsWithoutGenerators } from "../utilities/utilities";

interface DashboardProps {
    username: string;
    frequencies: Frequency[];
    ledgerEntries: LedgerEntry[];
    incomeGenerators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    getLedgerEntries: typeof getLedgerEntries;
    getIncomeGenerators: typeof getIncomeGenerators;
    getRecurringTransactions: typeof getRecurringTransactions;
    getFrequencies: typeof getFrequencies;
}

const Dashboard = (props: DashboardProps) => {

    UsesFrequencies(props.frequencies, props.getFrequencies);
    UsesLedgerEntries(props.getLedgerEntries);
    UsesIncomeGenerators(props.getIncomeGenerators);
    UsesRecurringTransactions(props.getRecurringTransactions);

    const headline: string = `Welcome, ${props.username}`

    const displayText = (): string => {
        const calculateTotalIncome = (): number => {
            if (props.incomeGenerators.length === 0) {
                return 0;
            }
            return props.incomeGenerators.map(x => calculateIncome(x, props.frequencies, true))
                .reduce((sum, x) => sum + x);
        }

        const calculateTotalRecurringTransactions = (): number => {
            if (props.recurringTransactions.length === 0) {
                return 0;
            }
            return transactionsWithoutGenerators(props.recurringTransactions, props.incomeGenerators)
                .map(x => getNumberOfTransactions(x.lastTriggered, x.frequencyId, props.frequencies, true) * (x.transactionType === 'Income' ? x.amount : -x.amount))
                .reduce((sum, x) => sum + x);
        }

        const calculateTotalEntries = (): number => {
            if (props.ledgerEntries.length === 0) {
                return 0;
            }
            return props.ledgerEntries.filter(x => !x.recurringTransactionId)
                .map(x => x.transactionType === 'Income' ? x.amount : -x.amount)
                .reduce((sum, x) => sum + x);
        }

        const total = calculateTotalIncome() + calculateTotalRecurringTransactions() + calculateTotalEntries();

        return `Remaining budget for ${MONTHS[new Date().getMonth()]}: $${total.toFixed(2)}`
    }

    return (
        <DashboardContainer>
            <Header>
                <h1>{headline}</h1>
                <p>{displayText()}</p>
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
        recurringTransactions: state.ledger.recurringTransactions
    };
}

export default connect(mapStateToProps, { getLedgerEntries, getIncomeGenerators, getRecurringTransactions, getFrequencies })(Dashboard as any);