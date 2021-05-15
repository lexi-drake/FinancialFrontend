import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDataState } from "../store/appdata";
import { logout } from "../store/user/actions";
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

    const onLogoutClick = () => {
        props.logout();
        props.push('/');
    }

    return (
        <div className="navbar">
            <div className="title" onClick={() => props.push('')}>
                letskeepit.cheap
            </div>

            <div className="navbar-auth">
                {props.isLoggedIn ?
                    <CustomLink last onClick={() => onLogoutClick()}>Logout</CustomLink>
                    : <CustomLink onClick={() => onLoginClick()}>Login</CustomLink>
                }
            </div>

            {props.isAdmin &&
                <div className="navbar-admin">
                    <CustomLink onClick={() => onAdminClick()}>Admin</CustomLink>
                </div>
            }
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