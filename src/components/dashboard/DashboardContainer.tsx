import { FunctionComponent } from "react";

interface DashboardContainerProps {

}

const DashboardContainer: FunctionComponent<DashboardContainerProps> = (props) => {

    return (
        <div className="dashboard-container">
            {props.children}
        </div>
    );
}

export default DashboardContainer;