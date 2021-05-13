import { connect } from "react-redux";
import Container from "../components/custom/Container"
import Header from "../components/custom/Header"
import Section from "../components/custom/Section"
import { SupportTicket } from "../models/SupportTicket";
import { AppDataState } from "../store/appdata";

interface InboxProps {
    username: string;
    tickets: SupportTicket[];
}

const Inbox = (props: InboxProps) => {

    // TODO (alexa): implement inbox.
    return (
        <Container>
            <Header>
                <h1>Inbox</h1>
            </Header>
            <Section>
                {/* {props.tickets.map(x =>
                    <MessageComponent subject={x.subject} content={x.content} sentBy={x.sentBy} date={x.createdDate} new={isNew(x, props.username)} />
                )} */}
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<InboxProps> => {
    return {
        username: state.user.username,
        tickets: state.user.tickets
    };
}

export default connect(mapStateToProps, {})(Inbox as any);