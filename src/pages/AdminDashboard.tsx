import { Fragment } from "react"
import { connect } from "react-redux";
import { AppDataState } from "../store/appdata";

interface AdminDashboardProps {

}

const AdminDashboard = (props: AdminDashboardProps) => {

    return (
        <Fragment>
            <h1>Admin Dashboard</h1>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AdminDashboardProps> => {
    return {};
}

export default connect(mapStateToProps, {})(AdminDashboard as any);