import { useState } from "react"

export interface DropdownOption {
    key: string;
    text: string;
    value: string;
}

interface CustomDropdownProps {
    value: string;
    label?: string;
    options: DropdownOption[];
    onSelect: (value: string) => void;
}

// TODO (alexa): this NEEDS styling!
const CustomDropdown = (props: CustomDropdownProps) => {
    const [focused, setFocused] = useState(false);

    const onSelect = (value: string) => {
        props.onSelect(value);
        setFocused(false);
    }

    const calculateClasses = (): string => {
        const classes: string[] = ['custom-dropdown'];
        if (focused) { classes.push('focused'); }
        return classes.join(' ');
    }

    const valueText = () => {
        const text: string[] = props.options.filter(x => x.value === props.value).map(x => x.text);
        return text.length > 0 ? text[0] : '';
    }

    return (
        <div className={calculateClasses()} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
            <div>
                <label>{props.label ? props.label : ''}</label>
                <input type="text" value={valueText()} onChange={(event) => props.onSelect(event.target.value)} />
                {focused && props.options.length > 0 &&
                    <div className="custom-dropdown">
                        {props.options.map(x => {
                            return (
                                <div key={x.key} className="custom-dropdown-item" onMouseDown={() => onSelect(x.value)}>
                                    <span className="text">{x.text}</span>
                                </div>);
                        })
                        }
                    </div>}
            </div>
        </div>
    );
}
export default CustomDropdown;