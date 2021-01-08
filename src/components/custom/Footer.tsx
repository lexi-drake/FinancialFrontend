import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDataState } from "../../store/appdata";
import { DAYS, MONTHS } from "../../utilities/constants";
import Container from "./Container";
import CustomLink from "./CustomLink";

interface FooterProps {
    push: typeof push;
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

    // TODO (alexa): style anchor tag.
    return (
        <div className="footer">
            <Container>
                <a href="https://www.github.com/lexi-drake" target="_blank">{getDate()}</a>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: AppDataState) => {
    return {};
}

export default connect(mapStateToProps, { push })(Footer as any);