import { Component } from 'react';
import Datepicker from 'react-datepicker';
import { Guid } from 'guid-typescript';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatepickerProps {
    value: Date;
    label: string;
    disabled?: boolean;
    onChange: (date: Date | [Date, Date] | null) => void;
}

const CustomDatepicker = (props: CustomDatepickerProps) => {

    return (
        <Datepicker selected={props.value} disabled={props.disabled} onChange={(date) => props.onChange(date)} customInput={<CustomInput label={props.label} />} />
    );
}

export default CustomDatepicker;

interface CustomInputProps {
    value?: string;
    label: string;
    disabled?: boolean;
    onClick?: () => void;
}

interface CustomInputState {
    focused: boolean;
    id: string;
}

class CustomInput extends Component<CustomInputProps, CustomInputState> {
    constructor(props: CustomInputProps) {
        super(props);
        this.state = {
            focused: false,
            id: Guid.create().toString()
        };
    }

    setFocused = (value: boolean) => {
        this.setState({ focused: value });
    }

    onClick = () => {
        if (!!this.props.onClick) {
            this.props.onClick();
        }
    }

    onLabelClick = () => {
        document.getElementById(this.state.id)?.focus();
    }

    calculateClasses = (): string => {
        const classes: string[] = ['custom-date-picker'];
        if (this.props.disabled) { classes.push('disabled'); }
        if (this.state.focused || !!this.props.value) { classes.push('active'); }
        return classes.join(' ');
    }

    render() {
        return (
            <div className={this.calculateClasses()} onClick={() => this.onClick()} onFocus={() => this.setFocused(true)} onBlur={() => this.setFocused(false)}>
                <label onClick={() => this.onLabelClick()}>{this.props.label}</label>
                <input id={this.state.id} type="text" disabled={this.props.disabled} value={this.props.value} />
            </div>
        );
    }
}