import { push } from "connected-react-router";
import { Fragment } from "react"
import { connect } from "react-redux";
import CustomLink from "../components/custom/CustomLink";
import { AppDataState } from "../store/appdata";
import { logout } from "../store/user/actions";

interface DashboardProps {
    username: string;
    isAdmin: boolean;
    logout: typeof logout;
    push: typeof push;
}

const Dashboard = (props: DashboardProps) => {

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
            <CustomLink onClick={() => onLogoutClick()}>Logout</CustomLink>
            {props.isAdmin && <CustomLink onClick={() => onAdminClick()}>Admin</CustomLink>}
        </Fragment >
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
        isAdmin: state.user.isAdmin
    };
}

export default connect(mapStateToProps, { logout, push })(Dashboard as any);