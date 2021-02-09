import { connect } from "react-redux";
import Header from "../components/custom/Header";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import IncomeGeneratorComponent from "../components/dashboard/IncomeGeneratorComponent";
import LedgerHistoryComponent from "../components/dashboard/LedgerHistoryComponent";
import RecurringTransactionComponent from "../components/dashboard/RecurringTransactionComponent";
import Frequency from "../models/Frequency";
import { AppDataState } from "../store/appdata";
import { getFrequencies, getIncomeGenerators, getLedgerEntries, getRecurringTransactions } from "../store/ledger/actions";
import { UsesFrequencies } from "../utilities/hooks";

interface DashboardProps {
    username: string;
    frequencies: Frequency[];
    getLedgerEntries: typeof getLedgerEntries;
    getIncomeGenerators: typeof getIncomeGenerators;
    getRecurringTransactions: typeof getRecurringTransactions;
    getFrequencies: typeof getFrequencies;
}

const Dashboard = (props: DashboardProps) => {

    UsesFrequencies(props.frequencies, props.getFrequencies);

    const headline: string = `Welcome, ${props.username}`

    // TODO (alexa): this needs another component that just displays the
    // total flex-spending for the month. I imagine it across the width of
    // the dashboard (in all sizes) at the top, under the header.
    return (
        <DashboardContainer>
            <Header>
                <h1>{headline}</h1>
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
        frequencies: state.ledger.frequencies
    };
}

export default connect(mapStateToProps, { getLedgerEntries, getIncomeGenerators, getRecurringTransactions, getFrequencies })(Dashboard as any);