import { connect } from "react-redux";
import Container from "../components/custom/Container"
import Header from "../components/custom/Header"
import Section from "../components/custom/Section"
import MessageComponent from "../components/MessageComponent";
import { Message } from "../models/Message";
import { AppDataState } from "../store/appdata";
import { isNew } from "../utilities/utilities";

interface InboxProps {
    username: string;
    messages: Message[];
}

const Inbox = (props: InboxProps) => {

    return (
        <Container>
            <Header>
                <h1>Inbox</h1>
            </Header>
            <Section>
                {props.messages.map(x =>
                    <MessageComponent subject={x.subject} content={x.content} sentBy={x.sentBy} date={x.createdDate} new={isNew(x, props.username)} />
                )}
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<InboxProps> => {
    return {
        username: state.user.username,
        messages: state.user.messages
    };
}

export default connect(mapStateToProps, {})(Inbox as any);