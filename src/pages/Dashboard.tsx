import { connect } from "react-redux";
import Header from "../components/custom/Header";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import IncomeGeneratorComponent from "../components/transactions/IncomeGeneratorComponent";
import LedgerHistoryComponent from "../components/transactions/LedgerHistoryComponent";
import { AppDataState } from "../store/appdata";
import { getTransactionTypes } from "../store/ledger/actions";

interface DashboardProps {
    username: string;
}

const Dashboard = (props: DashboardProps) => {

    const headline: string = `Welcome, ${props.username}`

    // TODO (alexa): These 'Container' components are temporary. Replace with better 
    // components for the dashboard (instead of just two columns).
    return (
        <DashboardContainer>
            <Header>
                <h1>{headline}</h1>
            </Header>
            <LedgerHistoryComponent />
            <IncomeGeneratorComponent />
        </DashboardContainer>
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
    };
}

export default connect(mapStateToProps, { getTransactionTypes })(Dashboard as any);