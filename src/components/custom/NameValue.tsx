interface NameValueProps {
    name: string;
    value: string;
}

const NameValue = (props: NameValueProps) => {

    return (
        <div className="name-value">
            {props.name &&
                <div className="name-value-name">
                    {props.name}
                </div>
            }
            {props.value &&
                <div className="name-value-value">
                    {props.value}
                </div>
            }
            <div className="after" />
        </div>
    );
}

export default NameValue;