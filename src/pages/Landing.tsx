import React from "react"
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { AppDataState } from '../store/appdata';
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import CustomButton from "../components/custom/CustomButton";
import Content from "../components/custom/Content";

interface LandingProps {
    count: number;
    push: typeof push;
}

const Landing = (props: LandingProps) =>
    <div className="landing-page">
        <Header>
            <h1>What is letskeepit.cheap?</h1>
            <p>
                A free, open source budgeting app.
            </p>
        </Header>
        <Section>
            <Content>
                <h1>Not a member yet?</h1>
                <CustomButton onClick={() => props.push('/signup')}>Sign up</CustomButton>
            </Content>
            <Content>
                <h1>Already a member?</h1>
                <CustomButton onClick={() => props.push('/login')}>Log in</CustomButton>
            </Content>
        </Section>
        <Section>
            <h1>Why?</h1>
            <p>
                Budgeting is hard, and I need an online tool to help me keep track of
                my spending. I've tried keeping track on paper and in spreadsheets, but
                I realized that my budget varies from week to week: my dayjob pays out
                every two weeks, I have weekly appointments to budget for, my car
                insurance is paid every six months, and I have all of my normal monthly
                expenses like housing, internet, and my phone. That means that, while
                most months I can expect two paychecks, some months I get three, and
                during some months I rack up five weekly appointments and other months I
                only have four, and keeping track of any payment that isn't made at least
                monthly is just beyond me.
            </p>
        </Section>
        <Section>
            <h1>There's a bunch of budgeting apps, why use this one?</h1>
            <p>
                Privacy is important to me, and I'm pretty careful about how much of my
                personal information gets onto the internet. I was really turned off by
                the amount of information that other budgeting apps were asking of me.
                I decided to try my hand at making a budgeting app that I want to use,
                without giving up anything I don't want to.
            </p>
            <p>
                letskeepit.cheap is open source, and I'm continually making improvements
                (just look at my commit history for proof). I'm also not interested in
                your data, so you don't need to worry about advertising emails or
                anything of that sort (I don't even ask for your email to sign up!).
            </p>
        </Section>
    </div>

const mapStateToProps = (state: AppDataState): Partial<LandingProps> => ({});

export default connect(mapStateToProps, { push })(Landing as any);