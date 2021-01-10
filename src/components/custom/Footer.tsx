import { connect } from "react-redux";
import { AppDataState } from "../../store/appdata";
import { DAYS, MONTHS } from "../../utilities/constants";
import Column from "./Column";
import Container from "./Container";

interface FooterProps {
}

const Footer = (props: FooterProps) => {

    const getDate = (): string => {
        const now = new Date();
        const month: number = now.getMonth();
        const dayOfWeek: number = now.getDay();
        const dayOfMonth: number = now.getDate();
        const year: number = now.getFullYear();

        return `${DAYS[dayOfWeek]} ${MONTHS[month]} ${dayOfMonth}, ${year}`;
    }

    return (
        <div className="footer">
            <Container>
                <Column>
                    <h1>Source</h1>
                    <div>
                        <a href="https://www.github.com/lexi-drake/FinancialFrontend" target="_blank">Front end</a>
                    </div>
                    <div>
                        <a href="https://www.github.com/lexi-drake/FinancialBackend" target="_blank">Back end</a>
                    </div>
                </Column>
                <Column>
                    <h1>Contact</h1>
                    <div>
                        <a href="mailto:alexa11drake@gmail.com">Email</a>
                    </div>
                </Column>
                <Column>
                    <h1>Resource links</h1>
                    <div>
                        <a href="https://imagecolorpicker.com/" target="_blank">Color picker</a>
                    </div>
                </Column>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: AppDataState) => {
    return {};
}

export default connect(mapStateToProps, {})(Footer as any);