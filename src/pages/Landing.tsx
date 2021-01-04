import React, { Fragment } from "react"
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { AppDataState } from '../store/appdata';
import CustomLink from "../components/custom/CustomLink";

interface LandingProps {
    push: typeof push;
}

const Landing = (props: LandingProps) => {

    const onLoginClick = () => {
        props.push('/dashboard');
    }

    const onSignUpClick = () => {
        props.push('/signup')
    }

    return (
        <Fragment>
            <h1>Landing Page</h1>
            <CustomLink onClick={() => onLoginClick()}>Login</CustomLink>
            <CustomLink onClick={() => onSignUpClick()}>Sign up</CustomLink>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<LandingProps> => {
    return {};
}

export default connect(mapStateToProps, { push })(Landing as any);