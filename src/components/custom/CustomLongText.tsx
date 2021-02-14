interface CustomLongTextProps {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

const CustomLongText = (props: CustomLongTextProps) => {

    return (
        <div className="custom-long-text">
            <textarea value={props.value} placeholder={props.placeholder} onChange={(event) => props.onChange(event.target.value)} />
        </div>
    )
}

export default CustomLongText;