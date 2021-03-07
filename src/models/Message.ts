export interface Message {
    ticketId: string;
    sentBy: string;
    subject: string;
    content: string;
    opened: boolean;
    createdDate: Date;
}

export interface MessageRequest {
    ticketId: string;
    subject: string;
    content: string;
}