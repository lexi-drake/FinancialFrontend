import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDataState } from "../store/appdata";
import Column from "./custom/Column";
import Container from "./custom/Container";
import CustomLink from "./custom/CustomLink";

interface FooterProps {
    push: typeof push;
}

const Footer = (props: FooterProps) =>
    <div className="footer">
        <Container>
            <Column>
                <h1>Source</h1>
                <div>
                    <a href="https://www.github.com/lexi-drake/FinancialFrontend" target="_blank" rel="noreferrer">Front end</a>
                </div>
                <div>
                    <a href="https://www.github.com/lexi-drake/FinancialBackend" target="_blank" rel="noreferrer">Back end</a>
                </div>
                <div>
                    <a href="https://www.github.com/lexi-drake/FinancialWorker" target="_blank" rel="noreferrer">Worker</a>
                </div>
            </Column>
            <Column>
                <h1>Helpful links</h1>
                <div>
                    <CustomLink onClick={() => props.push('/about')}>About</CustomLink>
                </div>
            </Column>
            <Column>
                <h1>Support</h1>
                <div>
                    <CustomLink onClick={() => props.push('/support')}>Submit a ticket</CustomLink>
                </div>
            </Column>
        </Container>
    </div>

const mapStateToProps = (state: AppDataState) => ({});

export default connect(mapStateToProps, { push })(Footer as any);