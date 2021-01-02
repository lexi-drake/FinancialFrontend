import { Fragment } from "react"
import { connect } from "react-redux";
import { AppDataState } from "../store/appdata";

interface DashboardProps {

}

const Dashboard = (props: DashboardProps) => {

    return (
        <Fragment>
            <h1>Dashboard</h1>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {};
}

export default connect(mapStateToProps, {})(Dashboard as any);