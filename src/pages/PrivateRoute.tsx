import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router";
import Container from "../components/custom/Container";
import Header from "../components/custom/Header";
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
    const [hasChecked, setHasChecked] = useState(false);
    const currentLocation = useLocation();

    useEffect(() => {
        // If the admin boolean is set we want to check that the user is an admin,
        // not just logged in.
        const checkLoginStatus = props.admin ? props.checkAdmin : props.checkLoggedIn;
        if (!hasChecked) {
            checkLoginStatus();
            setHasChecked(true);
        }
    }, [props.admin, props.checkLoggedIn, props.checkAdmin, hasChecked]);

    if (!hasChecked) {
        return (
            <Container>
                <Header>
                    <h1>Loading</h1>
                </Header>
            </Container>
        );
    }

    const isPermitted = (): boolean => {
        return props.admin ? props.isAdmin : props.isLoggedIn;
    }

    if (isPermitted()) {
        return <Route {...props} />
    } else {
        // If the user is not permitted, we want to set the redirect path and send
        // the user to the login page, which will redirect to the expected page upon
        // successful login.
        setRedirectPath(currentLocation.pathname);
        const renderComponent = () => (<Redirect to={{ pathname: '/login' }} />);
        return <Route {...props} component={renderComponent} render={undefined} />
    }
}

export default PrivateRoute;