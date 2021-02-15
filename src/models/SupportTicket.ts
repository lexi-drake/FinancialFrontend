import { Message } from "./Message";

export interface SupportTicket {
    id: string;
    messages: Message[];
    resolved: boolean;
    createdDate: Date;
}

export interface SubmitTicketRequest {
    subject: string;
    content: string;
}