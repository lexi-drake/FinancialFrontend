import { push } from "connected-react-router";
import { Fragment, useEffect } from "react"
import { connect } from "react-redux";
import CustomButton from "../components/custom/CustomButton";
import CustomLink from "../components/custom/CustomLink";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { AppDataState } from "../store/appdata";
import { getIncomeGenerators } from "../store/ledger/actions";
import { logout } from "../store/user/actions";

interface DashboardProps {
    username: string;
    isAdmin: boolean;
    incomeGenerators: IncomeGenerator[];
    getIncomeGenerators: typeof getIncomeGenerators;
    logout: typeof logout;
    push: typeof push;
}

const Dashboard = (props: DashboardProps) => {

    useEffect(() => {
        const getIncomeGenerators = props.getIncomeGenerators;
        if (props.incomeGenerators.length === 0) {
            getIncomeGenerators();
        }
    }, [props.incomeGenerators, props.getIncomeGenerators]);

    const onAddSourceOfIncomeClick = () => {
        props.push('/income/add');
    }

    const onLogoutClick = () => {
        props.logout();
    }

    const onAdminClick = () => {
        props.push('/dashboard/admin');
    }

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <p>Welcome, {props.username}</p>
            {props.incomeGenerators.length > 0 &&
                <div>
                    <h2>Sources of income</h2>
                    {props.incomeGenerators.map(x =>
                        <div>{x.description}</div>)
                    }
                </div>
            }
            <CustomButton onClick={() => onAddSourceOfIncomeClick()}>Add source of income</CustomButton>
            <CustomLink onClick={() => onLogoutClick()}>Logout</CustomLink>
            {props.isAdmin && <CustomLink onClick={() => onAdminClick()}>Admin</CustomLink>}
        </Fragment >
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
        isAdmin: state.user.isAdmin,
        incomeGenerators: state.ledger.incomeGenerators
    };
}

export default connect(mapStateToProps, { getIncomeGenerators, logout, push })(Dashboard as any);