import { useState } from "react";
import { Guid } from 'guid-typescript';

interface AutocompleteFieldProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    getOptions: (value: string) => void;
    clearOptions: () => void;
}

const AutocompleteField = (props: AutocompleteFieldProps) => {
    const [focused, setFocused] = useState(false);

    const id: string = Guid.create().toString();
    const onLabelClick = () => {
        document.getElementById(id)?.focus();
    }

    const onChange = (value: string) => {
        if (!!value) {
            // Only get the options if there's a value to autocomplete
            props.getOptions(value);
        }
        props.onChange(value);
    }

    const onSelect = (value: string) => {
        setFocused(false);
        props.onChange(value);
        props.clearOptions();
    }

    const calculateClasses = (): string => {
        // Re-using the styling for custom-dropdown
        const classes: string[] = ['custom-dropdown'];
        if (focused) { classes.push('focused'); }
        if (props.value || focused) { classes.push('active') }
        return classes.join(' ');
    }

    return (
        <div className={calculateClasses()} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
            <label onClick={() => onLabelClick()}>{props.label}</label>
            <input id={id} type="text" value={props.value} onChange={(event) => onChange(event.target.value)} />
            {focused && props.options.length > 0 &&
                <div className="custom-dropdown-menu">
                    {props.options.map(x => {
                        return (
                            <div key={x} className="custom-dropdown-item" onMouseDown={() => onSelect(x)}>
                                <span className="text">{x}</span>
                            </div>);
                    })
                    }
                </div>}
        </div>
    );
}

export default AutocompleteField;