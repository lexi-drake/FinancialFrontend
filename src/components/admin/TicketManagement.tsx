import { push } from "connected-react-router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { SupportTicket } from "../../models/SupportTicket";
import { resolveTicket, submitAdminMessage } from "../../store/admin/actions";
import { AppDataState } from "../../store/appdata";
import { getReadableDate } from "../../utilities/dates";
import Container from "../custom/Container"
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import CustomLongText from "../custom/CustomLongText";
import CustomText from "../custom/CustomText";
import Header from "../custom/Header";
import Section from "../custom/Section";

interface TicketManagementProps {
    tickets: SupportTicket[];
    submitAdminMessage: typeof submitAdminMessage;
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
        await props.submitAdminMessage({ ticketId: id, subject, content });
        props.push('/dashboard/admin')
    }

    return (
        <Container>
            <Header>
                <h1>Manage ticket</h1>
            </Header>
            <Section>
                {ticket.messages.map((x, i) =>
                    <div className="message">
                        <Content>
                        </Content>
                        <Content>
                            <h1>{x.subject}</h1>
                            <div className="author">{`Sent by: ${x.sentBy.username}`}</div>
                            <div>{getReadableDate(x.createdDate)}</div>
                            <hr />
                            <p>{x.content}</p>
                        </Content>
                        {i === 0 &&
                            <Content>
                                <CustomButton disabled={resolved || ticket.resolved} error onClick={() => onResolveClick()}>{ticket.resolved ? 'Resolved' : 'Resolve'}</CustomButton>
                            </Content>
                        }
                    </div>
                )}
            </Section>
            <Section>
                <h1>Respond</h1>
                <Content>
                    <CustomText value={subject} label="Subject" onChange={value => setSubject(value)} />
                    <CustomLongText value={content} placeholder="How would you like to respond?" onChange={value => setContent(value)} />
                </Content>
                <Content>
                    <CustomButton disabled={submitDisabled} onClick={() => onSubmitClick()} >Submit</CustomButton>
                </Content>
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<TicketManagementProps> => {
    return {
        tickets: state.admin.tickets
    };
}

export default connect(mapStateToProps, { submitAdminMessage, resolveTicket, push })(TicketManagment as any);