import { Redirect, Route, RouteProps, useLocation } from "react-router";
import { checkAdmin, checkLoggedIn } from "../store/user/actions";
import { setRedirectPath } from "../utilities/utilities";

interface PrivateRouteProps extends RouteProps {
    admin?: boolean;
    isLoggedIn: boolean;
    isAdmin: boolean;
    checkLoggedIn: typeof checkLoggedIn;
    checkAdmin: typeof checkAdmin;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const currentLocation = useLocation();

    const checkLoginStatus = props.admin ? props.checkAdmin : props.checkLoggedIn;
    checkLoginStatus();

    const isPermitted = (): boolean => {
        return props.admin ? props.isAdmin : props.isLoggedIn;
    }

    if (isPermitted()) {
        return <Route {...props} />
    } else {
        setRedirectPath(currentLocation.pathname);
        const renderComponent = () => (<Redirect to={{ pathname: '/login' }} />);
        return <Route {...props} component={renderComponent} render={undefined} />
    }
}

export default PrivateRoute;