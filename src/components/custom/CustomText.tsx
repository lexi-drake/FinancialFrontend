import { FunctionComponent } from "react";

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

    const calculateClasses = (): string => {
        const classes: string[] = ['custom-text'];
        if (!!props.preToken) { classes.push('has-pre-token'); }
        if (props.disabled) { classes.push('disabled'); }
        if (props.error) { classes.push('error'); }
        return classes.join(' ');
    }

    const getType = (): string => {
        return props.password ? 'password' : 'text';
    }

    return (
        <div className={calculateClasses()}>
            <label>{props.label ? props.label : ''}</label>
            <span className='text-pre'>{props.preToken ? props.preToken[0] : ''}</span>
            <input type={getType()} value={props.value} disabled={props.disabled} onChange={(event) => props.onChange(event.target.value)} />
        </div>
    )
}

export default CustomText