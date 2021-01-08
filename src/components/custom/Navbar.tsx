import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDataState } from "../../store/appdata";
import { logout } from "../../store/user/actions";
import Container from "./Container";
import CustomLink from "./CustomLink"

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
                {props.isLoggedIn &&
                    <div>
                        <CustomLink last onClick={() => onLogoutClick()}>Logout</CustomLink>
                        <CustomLink onClick={() => onDashboardClick()}>Dashboard</CustomLink>
                    </div>
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