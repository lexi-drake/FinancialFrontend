import React from "react"
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { AppDataState } from '../store/appdata';
import Container from "../components/custom/Container";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import CustomButton from "../components/custom/CustomButton";

interface LandingProps {
    push: typeof push;
}

const Landing = (props: LandingProps) => {

    const onSignUpClick = () => {
        props.push('/signup')
    }

    return (
        <Container>
            <Header>
                <h1>What is this?</h1>
                <p>
                    This is a budgeting app that is not concerned with collecting data.
                    It's free to use and it's open-source.
                </p>
            </Header>
            <Section>
                <p>
                    Not a member, yet?
                </p>
                <CustomButton onClick={() => onSignUpClick()}>Sign up</CustomButton>
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<LandingProps> => {
    return {};
}

export default connect(mapStateToProps, { push })(Landing as any);