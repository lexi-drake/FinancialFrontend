import { push } from "connected-react-router";
import { Fragment } from "react";
import { connect } from "react-redux";
import { AppDataState } from "../store/appdata";
import { logout } from "../store/user/actions";
import Container from "./custom/Container";
import CustomLink from "./custom/CustomLink"

interface NavbarProps {
    isLoggedIn: boolean;
    isAdmin: boolean;
    logout: typeof logout;
    push: typeof push;
}

const Navbar = (props: NavbarProps) => {

    const onLoginClick = () => {
        props.push('/login');
    }

    const onAdminClick = () => {
        props.push('/dashboard/admin');
    }

    const onDashboardClick = () => {
        props.push('/dashboard');
    }

    const onLogoutClick = () => {
        props.logout();
        props.push('/');
    }

    return (
        <div className="navbar">
            <Container>
                <h1 onClick={() => props.push('')}>letskeepit.cheap</h1>
                {props.isLoggedIn &&
                    <Fragment>
                        <CustomLink last onClick={() => onLogoutClick()}>Logout</CustomLink>
                        <CustomLink onClick={() => onDashboardClick()}>Dashboard</CustomLink>
                    </Fragment>
                }
                {!props.isLoggedIn &&
                    <CustomLink onClick={() => onLoginClick()}>Login</CustomLink>
                }
                {props.isAdmin &&
                    <CustomLink onClick={() => onAdminClick()}>Admin</CustomLink>
                }
            </Container>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<NavbarProps> => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        isAdmin: state.user.isAdmin
    };
}

export default connect(mapStateToProps, { logout, push })(Navbar as any);