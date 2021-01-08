import { FunctionComponent, useState } from "react";
import { Guid } from 'guid-typescript';

interface CustomTextProps {
    preToken?: string;
    password?: boolean;
    error?: boolean;
    disabled?: boolean;
    value: string;
    label?: string;
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
        if (focused || !!props.value || !!props.preToken) { classes.push('active'); }
        if (!!props.preToken) { classes.push('has-pre-token'); }
        if (props.disabled) { classes.push('disabled'); }
        if (props.error) { classes.push('error'); }
        return classes.join(' ');
    }

    const getType = (): string => {
        return props.password ? 'password' : 'text';
    }

    return (
        <div className={calculateClasses()} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
            <label onClick={() => onLabelClick()}>{props.label ? props.label : ''}</label>
            <span className='text-pre'>{props.preToken ? props.preToken[0] : ''}</span>
            <input id={id} type={getType()} value={props.value} disabled={props.disabled} onChange={(event) => props.onChange(event.target.value)} />
        </div>
    )
}

export default CustomText