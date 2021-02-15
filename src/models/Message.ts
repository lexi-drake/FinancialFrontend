export interface Message {
    ticketId: string;
    sentBy: UserData;
    subject: string;
    content: string;
    opened: boolean;
    createdDate: Date;
}

export interface UserData {
    id: string;
    username: string;
}

export interface MessageRequest {
    ticketId: string;
    subject: string;
    content: string;
}