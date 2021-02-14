import React, { useState } from "react";
import { connect } from "react-redux";
import { SupportTicket } from "../../models/SupportTicket";
import { getTickets } from "../../store/admin/actions";
import { AppDataState } from "../../store/appdata";
import { getReadableDate } from "../../utilities/dates";
import { UsesTickets } from "../../utilities/hooks";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import Modal, { ModalContent, ModalHeader } from "../custom/Modal";
import Section from "../custom/Section";
import Selector, { SelectorOption } from "../custom/Selector";

interface TicketsOverviewProps {
    tickets: SupportTicket[];
    getTickets: typeof getTickets;
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

    const { subject, content } = !!ticketId ? props.tickets.find(x => x.id === ticketId)! : { subject: '', content: '' }

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
                            {x.subject}
                        </div>
                        <hr />
                    </div>
                )}
            </Section>
            <Modal show={!!ticketId}>
                < ModalHeader >
                    <h1>{subject}</h1>
                </ModalHeader>
                <ModalContent>
                    <Content>
                        {content}
                    </Content>
                    <CustomButton error onClick={() => { }}>Resolve</CustomButton>
                    <CustomButton onClick={() => { }}>Respond</CustomButton>
                    <CustomButton onClick={() => setTicketId('')}>Close</CustomButton>
                </ModalContent>
            </Modal>
        </div >
    );
}

const mapStateToProps = (state: AppDataState): Partial<TicketsOverviewProps> => {
    return {
        tickets: state.admin.tickets
    };
}

export default connect(mapStateToProps, { getTickets })(TicketsOverview as any);