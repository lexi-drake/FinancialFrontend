import { connect } from "react-redux";
import Header from "../components/custom/Header";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import IncomeGeneratorComponent from "../components/dashboard/IncomeGeneratorComponent";
import LedgerHistoryComponent from "../components/dashboard/LedgerHistoryComponent";
import RecurringTransactionComponent from "../components/dashboard/RecurringTransactionComponent";
import { AppDataState } from "../store/appdata";
import { getTransactionTypes } from "../store/ledger/actions";

interface DashboardProps {
    username: string;
}

const Dashboard = (props: DashboardProps) => {

    const headline: string = `Welcome, ${props.username}`

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
    };
}

export default connect(mapStateToProps, { getTransactionTypes })(Dashboard as any);