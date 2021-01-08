import { connect } from "react-redux";
import Container from "../components/custom/Container";
import Header from "../components/custom/Header";
import IncomeGeneratorComponent from "../components/transactions/IncomeGeneratorComponent";
import { AppDataState } from "../store/appdata";
import { MONTHS, DAYS } from "../utilities/constants";

interface DashboardProps {
    username: string;
}

const Dashboard = (props: DashboardProps) => {

    const getDate = (): string => {
        const now = new Date();
        const month: number = now.getMonth();
        const dayOfWeek: number = now.getDay();
        const dayOfMonth: number = now.getDate();
        const year: number = now.getFullYear();

        return `${DAYS[dayOfWeek]} ${MONTHS[month]} ${dayOfMonth}, ${year}`;
    }

    // TODO (alexa): move the date stuff to the footer.
    // TODO (alexa): make a footer component that will house things
    // like how-to-contact and the date and links to github.
    const headline: string = `Welcome, ${props.username}. It is ${getDate()}`

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