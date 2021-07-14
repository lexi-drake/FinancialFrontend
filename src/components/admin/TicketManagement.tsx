import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { SupportTicket } from "../../models/SupportTicket";
import { resolveTicket, } from "../../store/admin/actions";
import { AppDataState } from "../../store/appdata";
import { submitMessage } from "../../store/user/actions";
import { isNew } from "../../utilities/utilities";
import CustomButton from "../custom/CustomButton";
import CustomLongText from "../custom/CustomLongText";
import CustomText from "../custom/CustomText";
import Header from "../custom/Header";
import Section from "../custom/Section";
import MessageComponent from "../MessageComponent";

interface TicketManagementProps {
    username: string;
    tickets: SupportTicket[];
    submitMessage: typeof submitMessage;
    resolveTicket: typeof resolveTicket;
    push: typeof push;
}

const TicketManagment = (props: TicketManagementProps) => {
    const [resolved, setResolved] = useState(false);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const { id } = useParams<{ id: string }>();

    const ticket: SupportTicket = props.tickets.find(x => x.id === id)!;

    const onResolveClick = async () => {
        setResolved(true);
        await props.resolveTicket(id);
    }

    const submitDisabled: boolean = !subject || !content;

    const onSubmitClick = async () => {
        await props.submitMessage({ ticketId: id, subject, content });
        props.push('/dashboard/admin')
    }

    return (
        <div className="ticket-managment">
            <Header>
                <h1>Manage ticket</h1>
            </Header>
            <Section>
                <CustomButton disabled={resolved || ticket.resolved} error onClick={() => onResolveClick()}>{ticket.resolved ? 'Resolved' : 'Resolve'}</CustomButton>

                <CustomText value={subject} label="Subject" onChange={value => setSubject(value)} />
                <CustomLongText value={content} placeholder="How would you like to respond?" onChange={value => setContent(value)} />

                <CustomButton disabled={submitDisabled} onClick={() => onSubmitClick()} >Submit</CustomButton>

            </Section>
            <Section>
                {ticket.messages.map(x => <MessageComponent subject={x.subject} content={x.content} sentBy={x.sentBy} date={x.createdDate} new={isNew(x, props.username)} />)}
            </Section>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<TicketManagementProps> => {
    return {
        username: state.user.username,
        tickets: state.user.tickets
    };
}

export default connect(mapStateToProps, { submitMessage, resolveTicket, push })(TicketManagment as any);