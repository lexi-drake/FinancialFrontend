import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import { SupportTicket } from "../../models/SupportTicket";
import { AppDataState } from "../../store/appdata";
import { getTickets } from "../../store/user/actions";
import { getReadableDate } from "../../utilities/dates";
import { UsesTickets } from "../../utilities/hooks";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import Modal, { ModalContent, ModalHeader } from "../custom/Modal";
import Section from "../custom/Section";
import Selector, { SelectorOption } from "../custom/Selector";

interface TicketsOverviewProps {
    username: string;
    tickets: SupportTicket[];
    getTickets: typeof getTickets;
    push: typeof push;
}

const TicketsOverview = (props: TicketsOverviewProps) => {
    const [resolved, setResolved] = useState('open');
    const [ticketId, setTicketId] = useState('');

    UsesTickets(props.getTickets)

    const selectorOptions: SelectorOption[] = [
        { value: 'open', description: 'Open' },
        { value: 'resolved', description: 'Resolved' }
    ];

    const getTicketsToRender = (): SupportTicket[] =>
        props.tickets.filter(x => (resolved === 'resolved') ? x.resolved : !x.resolved);

    const getMostRecentMessage = (ticketId: string): { subject: string, content: string } => {
        var ticket = props.tickets.find(x => x.id === ticketId)!;
        return ticket.messages.find(x => x.sentBy !== props.username) || ticket.messages[0];
    }

    const { subject, content } = !!ticketId ? getMostRecentMessage(ticketId) : { subject: '', content: '' }

    return (
        <div className="tickets-overview">
            <Section>
                <h1>Support tickets</h1>
                <Selector value={resolved} options={selectorOptions} onChange={value => setResolved(value)} />
                {getTicketsToRender().map(x =>
                    <div className="ticket-summary" onClick={() => setTicketId(x.id)}>

                        <div className="date">
                            {getReadableDate(x.createdDate)}
                        </div>
                        <div className="subject">
                            {x.messages[0].subject}
                        </div>
                        <hr />
                    </div>
                )}
            </Section>
            <Modal show={!!ticketId} close={() => setTicketId('')}>
                < ModalHeader >
                    <h1>{subject}</h1>
                </ModalHeader>
                <ModalContent>
                    <Content>
                        {content}
                    </Content>
                    <CustomButton error onClick={() => { }}>Resolve</CustomButton>
                    <CustomButton onClick={() => { props.push(`/ticket/${ticketId}`) }}>Respond</CustomButton>

                </ModalContent>
            </Modal>
        </div >
    );
}

const mapStateToProps = (state: AppDataState): Partial<TicketsOverviewProps> => {
    return {
        username: state.user.username,
        tickets: state.user.tickets
    };
}

export default connect(mapStateToProps, { getTickets, push })(TicketsOverview as any);