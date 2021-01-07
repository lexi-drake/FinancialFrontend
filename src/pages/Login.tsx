import { push } from "connected-react-router";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import CustomButton from "../components/custom/CustomButton";
import UserInfo from "../components/UserInfo";
import { AppDataState } from "../store/appdata";
import { checkLoggedIn, login } from "../store/user/actions";
import { clearRedirectPath, getRedirectPath } from "../utilities/utilities";

interface LoginProps {
    isLoggedIn: boolean;
    checkLoggedIn: typeof checkLoggedIn;
    login: typeof login;
    push: typeof push;
}

const Login = (props: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    const onLoginClick = async () => {
        await props.login({
            username: username,
            password: password
        });
        const redirectPath = getRedirectPath();
        if (redirectPath) {
            props.push(redirectPath);
            clearRedirectPath();
        } else {
            push('/dashboard');
        }
    }

    const loginDisabled = (): boolean => {
        // We enforce minimum password length in sign-up but not login
        return !username || !password;
    }

    return (
        <Fragment>
            <h1>Login</h1>
            <UserInfo username={username} password={password} handleUsernameChanged={(value) => setUsername(value)} handlePasswordChanged={(value) => setPassword(value)} />
            <CustomButton disabled={loginDisabled()} onClick={() => onLoginClick()}>Login</CustomButton>
        </Fragment >
    );
}

const mapStateToProps = (state: AppDataState): Partial<LoginProps> => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
}

export default connect(mapStateToProps, { checkLoggedIn, login, push })(Login as any);