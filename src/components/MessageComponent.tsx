import { getReadableDate } from "../utilities/dates";

interface MessageComponentProps {
    subject: string;
    content: string;
    date: Date;
    sentBy: string;
    new: boolean;
}

const MessageComponent = (props: MessageComponentProps) => {

    const getClasses = (): string => {
        const classes: string[] = ['message'];
        if (props.new) { classes.push('new'); }
        return classes.join(' ');
    }

    return (
        <div className={getClasses()}>

            <h1>{props.subject}</h1>
            <div className="author">{`Sent by: ${props.sentBy}`}</div>
            <div>{getReadableDate(props.date)}</div>
            <hr />
            <p>{props.content}</p>

        </div>
    );
}

export default MessageComponent;