import { connect } from "react-redux";
import AddTypeComponent from "../components/admin/AddTypeComponent";
import Header from "../components/custom/Header";
import { makeAdminRequest, submitFrequency } from "../store/admin/actions";
import { AppDataState } from "../store/appdata";

interface AdminDashboardProps {
}

const AdminDashboard = (props: AdminDashboardProps) => {


    return (
        <div className="admin-dashboard" >
            <Header>
                <h1>Administration</h1>
            </Header>
            <AddTypeComponent />
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AdminDashboardProps> => {
    return {};
}

export default connect(mapStateToProps, { makeAdminRequest, submitFrequency })(AdminDashboard as any);