import { push } from "connected-react-router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CustomButton from "../components/custom/CustomButton";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import UserInfo from "../components/UserInfo";
import { AppDataState } from "../store/appdata";
import { checkLoggedIn, clearUserError, login } from "../store/user/actions";
import { MINIMUM_PASSWORD_LENGTH } from "../utilities/constants";
import { ClearsUserError } from "../utilities/hooks";
import { clearRedirectPath, getRedirectPath } from "../utilities/utilities";

interface LoginProps {
    error: string;
    isLoggedIn: boolean;
    checkLoggedIn: typeof checkLoggedIn;
    clearUserError: typeof clearUserError;
    login: typeof login;
    push: typeof push;
}

const Login = (props: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const checkLoggedIn = props.checkLoggedIn;
        checkLoggedIn();
        if (props.isLoggedIn) {
            const redirectPath = getRedirectPath();
            const push = props.push;
            if (redirectPath) {
                push(redirectPath);
                clearRedirectPath();
            } else {
                push('/dashboard');
            }
        }
    }, [props.isLoggedIn, props.checkLoggedIn, props.push]);

    ClearsUserError(props.clearUserError);

    const onLoginClick = async () => {
        props.clearUserError();
        setProcessing(true);
        await props.login({
            username: username,
            password: password
        });
        setProcessing(false);
        const redirectPath = getRedirectPath();
        if (redirectPath) {
            props.push(redirectPath);
            clearRedirectPath();
        } else {
            push('/dashboard');
        }
    }

    // The minimum password length is enforced at sign-up but not login
    const loginDisabled = (): boolean => processing || !username || password.length < MINIMUM_PASSWORD_LENGTH;

    return (
        <div className="login">
            <Header>
                <h1>Login</h1>
            </Header>
            <Section>
                <div className="error">
                    {props.error}
                    <form>
                        <UserInfo error={!!props.error} username={username} password={password} handleUsernameChanged={(value) => setUsername(value)} handlePasswordChanged={(value) => setPassword(value)} />
                        <CustomButton disabled={loginDisabled()} onClick={() => onLoginClick()}>{processing ? 'Logging in' : 'Log in'}</CustomButton>
                    </form>
                </div>
            </Section>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<LoginProps> => {
    return {
        error: state.user.error,
        isLoggedIn: state.user.isLoggedIn
    };
}

export default connect(mapStateToProps, { checkLoggedIn, clearUserError, login, push })(Login as any);