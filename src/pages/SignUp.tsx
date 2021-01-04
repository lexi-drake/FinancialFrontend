import { push } from "connected-react-router";
import { Fragment, useState } from "react"
import { connect } from "react-redux"
import CustomButton from "../components/custom/CustomButton";
import UserInfo from "../components/UserInfo";
import { AppDataState } from "../store/appdata"
import { createUser } from "../store/user/actions";
import { MINIMUM_PASSWORD_LENGTH } from "../utilities/constants";

interface SignUpProps {
    createUser: typeof createUser;
    push: typeof push;
}

const SignUp = (props: SignUpProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUpDisabled = (): boolean => {
        return !username || password.length < MINIMUM_PASSWORD_LENGTH;
    }

    const onSignUpClick = async () => {
        await props.createUser({
            username: username,
            password: password
        });
        push('/dashboard');
    }

    return (
        <Fragment>
            <h1>Sign up</h1>
            <UserInfo username={username} password={password} handleUsernameChanged={(value) => setUsername(value)} handlePasswordChanged={(value) => setPassword(value)} />
            <CustomButton disabled={signUpDisabled()} onClick={() => onSignUpClick()}>Sign up</CustomButton>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<SignUpProps> => {
    return {};
}

export default connect(mapStateToProps, { createUser, push })(SignUp as any);