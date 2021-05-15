import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDataState } from "../store/appdata";
import CustomLink from "./custom/CustomLink";

interface FooterProps {
    push: typeof push;
}

const Footer = (props: FooterProps) =>
    <div className="footer">
        <div className="title">Links</div>
        <div className="frontend">
            <a href="https://www.github.com/lexi-drake/FinancialFrontend" target="_blank" rel="noreferrer">Front end</a>
        </div>
        <div className="backend">
            <a href="https://www.github.com/lexi-drake/FinancialBackend" target="_blank" rel="noreferrer">Back end</a>
        </div>
        <div className="worker">
            <a href="https://www.github.com/lexi-drake/FinancialWorker" target="_blank" rel="noreferrer">Worker</a>
        </div>

        <div className="about">
            <CustomLink onClick={() => props.push('/about')}>About</CustomLink>
        </div>
    </div>

const mapStateToProps = (state: AppDataState) => ({});

export default connect(mapStateToProps, { push })(Footer as any);