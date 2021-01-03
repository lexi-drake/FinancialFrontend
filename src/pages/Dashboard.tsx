import { Fragment } from "react"
import { connect } from "react-redux";
import CustomLink from "../components/custom/CustomLink";
import { AppDataState } from "../store/appdata";
import { logout } from "../store/user/actions";

interface DashboardProps {
    logout: typeof logout;
}

const Dashboard = (props: DashboardProps) => {

    const onLogoutClick = () => {
        props.logout();
    }

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <CustomLink onClick={() => onLogoutClick()}>Logout</CustomLink>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {};
}

export default connect(mapStateToProps, { logout })(Dashboard as any);