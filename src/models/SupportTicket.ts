export interface SupportTicket {
    id: string;
    submittingUserId: string;
    submittingUserName: string;
    subject: string;
    content: string;
    resolved: boolean;
    createdDate: Date;
}

export interface SubmitTicketRequest {
    subject: string;
    content: string;
}