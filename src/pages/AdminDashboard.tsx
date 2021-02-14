import { connect } from "react-redux";
import AddTypeComponent from "../components/admin/AddTypeComponent";
import TicketsOverviewComponent from "../components/admin/TicketsOverviewComponent";
import Header from "../components/custom/Header";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import { makeAdminRequest, submitFrequency } from "../store/admin/actions";
import { AppDataState } from "../store/appdata";

interface AdminDashboardProps {
}

const AdminDashboard = (props: AdminDashboardProps) => {


    return (
        <DashboardContainer>
            <Header>
                <h1>Administration</h1>
            </Header>
            <TicketsOverviewComponent />
            <AddTypeComponent />
        </DashboardContainer>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AdminDashboardProps> => {
    return {};
}

export default connect(mapStateToProps, { makeAdminRequest, submitFrequency })(AdminDashboard as any);