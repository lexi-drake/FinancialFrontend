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