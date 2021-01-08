import { FunctionComponent } from "react";

interface CustomButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const CustomButton: FunctionComponent<CustomButtonProps> = (props) => {

    const onClick = () => {
        if (!props.disabled) {
            props.onClick();
        }
    }

    const calculateClasses = (): string => {
        const classes: string[] = ['custom-button'];
        if (props.disabled) { classes.push('disabled'); }
        return classes.join(' ');
    }

    return (
        <div className={calculateClasses()} onClick={() => onClick()}>
            {props.children}
        </div>
    )
}

export default CustomButton;