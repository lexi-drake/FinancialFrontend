import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDataState } from "../store/appdata";
import Column from "./custom/Column";
import Container from "./custom/Container";
import CustomLink from "./custom/CustomLink";

interface FooterProps {
    push: typeof push;
}

const Footer = (props: FooterProps) => {

    const onAboutClick = () => {
        props.push('/about');
    }

    return (
        <footer className="footer">
            <Container>
                <Column>
                    <h1>Source</h1>
                    <div>
                        <a href="https://www.github.com/lexi-drake/FinancialFrontend" target="_blank" rel="noreferrer">Front end</a>
                    </div>
                    <div>
                        <a href="https://www.github.com/lexi-drake/FinancialBackend" target="_blank" rel="noreferrer">Back end</a>
                    </div>
                </Column>
                <Column>
                    <h1>Helpful links</h1>
                    <div>
                        <CustomLink onClick={() => onAboutClick()}>About</CustomLink>
                    </div>
                </Column>
                <Column>
                    <h1>Support</h1>
                </Column>
            </Container>
        </footer>
    );
}

const mapStateToProps = (state: AppDataState) => {
    return {};
}

export default connect(mapStateToProps, { push })(Footer as any);