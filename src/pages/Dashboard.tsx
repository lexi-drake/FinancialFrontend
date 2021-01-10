import { connect } from "react-redux";
import Container from "../components/custom/Container";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
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
        <div id="dashboard">
            <Container>
                <Header>
                    <h1>Dashboard</h1>
                    <p>{headline}</p>
                </Header>
                <Section>
                    <IncomeGeneratorComponent />
                </Section>
            </Container >
            <Container>
                <Section>
                    <LedgerHistoryComponent />
                </Section>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
    };
}

export default connect(mapStateToProps, { getTransactionTypes })(Dashboard as any);