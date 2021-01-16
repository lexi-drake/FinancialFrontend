import { connect } from "react-redux";
import Container from "../components/custom/Container";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import { AppDataState } from "../store/appdata";

interface AboutProps {

}

const About = (props: AboutProps) => {

    return (
        <Container>
            <Header>
                <h1>About</h1>
            </Header>
            <Section>
                <h1>How does this work?</h1>
                <p>
                    Coming soon...
                </p>
            </Section>
            <Section>
                <h1>My account doesn't work anymore?</h1>
                <p>
                    Accounts (and all of the data associated with them) are
                    automatically deleted after 45 days of inactivity. I do
                    this to prevent the data from getting stale (I have no
                    reason to hold onto data that's of no use to its owner)
                    and to keep the amount of data that I actually store and
                    handle to a minimum because less data is cheaper to deal
                    with.
                </p>
            </Section>
            <Section>
                <h1>Credits</h1>
                <p>
                    Favicon made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </p>
            </Section>
        </Container>

    );
}

const mapStateToProps = (state: AppDataState): Partial<AboutProps> => {
    return {};
}

export default connect(mapStateToProps, {})(About as any);