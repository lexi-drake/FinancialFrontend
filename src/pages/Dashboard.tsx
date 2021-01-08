import { connect } from "react-redux";
import Container from "../components/custom/Container";
import Header from "../components/custom/Header";
import IncomeGeneratorComponent from "../components/transactions/IncomeGeneratorComponent";
import { AppDataState } from "../store/appdata";

interface DashboardProps {
    username: string;
}

const Dashboard = (props: DashboardProps) => {

    const headline: string = `Welcome, ${props.username}`

    return (
        <Container>
            <Header>
                <h1>Dashboard</h1>
                <p>{headline}</p>
            </Header>
            <IncomeGeneratorComponent />
        </Container >
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
    };
}

export default connect(mapStateToProps, {})(Dashboard as any);