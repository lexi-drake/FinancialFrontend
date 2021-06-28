import { FunctionComponent, useState } from "react";
import { Guid } from 'guid-typescript';

interface CustomTextProps {
    preToken?: string;
    password?: boolean;
    error?: boolean;
    disabled?: boolean;
    value: string;
    label: string;
    onChange: (value: string) => void;
}

const CustomText: FunctionComponent<CustomTextProps> = (props) => {
    const [focused, setFocused] = useState(false);

    const id: string = Guid.create().toString();
    const onLabelClick = () => {
        document.getElementById(id)?.focus();
    }

    const calculateClasses = (): string => {
        const classes: string[] = ['custom-text'];
        if (!!props.preToken) { classes.push('has-pre-token'); }
        if (focused || !!props.value || !!props.preToken) { classes.push('active'); }
        if (props.disabled) { classes.push('disabled'); }
        if (props.error) { classes.push('error'); }
        return classes.join(' ');
    }

    const getType = (): string => props.password ? 'password' : 'text';

    return (
        <div className={calculateClasses()} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
            <label onClick={() => onLabelClick()}>{props.label}</label>
            {!!props.preToken &&

                <span className="text-pre">{props.preToken}</span>
            }
            <input id={id} type={getType()} value={props.value} disabled={props.disabled} onChange={(event) => props.onChange(event.target.value)} />
        </div>
    )
}

export default CustomText