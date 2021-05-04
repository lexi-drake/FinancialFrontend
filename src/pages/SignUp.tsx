import { push } from "connected-react-router";
import { useState } from "react"
import { connect } from "react-redux"
import Container from "../components/custom/Container";
import CustomButton from "../components/custom/CustomButton";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import UserInfo from "../components/UserInfo";
import { AppDataState } from "../store/appdata"
import { clearUserError, createUser } from "../store/user/actions";
import { MINIMUM_PASSWORD_LENGTH } from "../utilities/constants";
import { ClearsUserError } from "../utilities/hooks";

interface SignUpProps {
    error: string;
    createUser: typeof createUser;
    clearUserError: typeof clearUserError;
    push: typeof push;
}

const SignUp = (props: SignUpProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);

    ClearsUserError(props.clearUserError);

    const signUpDisabled = (): boolean => processing || !username || password.length < MINIMUM_PASSWORD_LENGTH;

    const onSignUpClick = async () => {
        props.clearUserError();
        setProcessing(true);
        await props.createUser({
            username: username,
            password: password
        });
        setProcessing(false);
        push('/dashboard');
    }

    return (
        <Container>
            <Header>
                <h1>Sign up</h1>
            </Header>
            <Section>
                <div className="error">
                    {props.error}
                </div>
                <form>
                    <UserInfo error={!!props.error} username={username} password={password} handleUsernameChanged={(value) => setUsername(value)} handlePasswordChanged={(value) => setPassword(value)} />
                    <CustomButton disabled={signUpDisabled()} onClick={() => onSignUpClick()}>{processing ? 'Signing up' : 'Sign up'}</CustomButton>
                </form>
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<SignUpProps> => {
    return {
        error: state.user.error
    };
}

export default connect(mapStateToProps, { createUser, clearUserError, push })(SignUp as any);