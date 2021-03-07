import React from "react";
import { getReadableDate } from "../utilities/dates";
import Content from "./custom/Content";

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
            <Content>
                <h1>{props.subject}</h1>
                <div className="author">{`Sent by: ${props.sentBy}`}</div>
                <div>{getReadableDate(props.date)}</div>
                <hr />
                <p>{props.content}</p>
            </Content>
        </div>
    );
}

export default MessageComponent;