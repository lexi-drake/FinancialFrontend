import { FunctionComponent } from "react";

interface CustomButtonProps {
    onClick: () => void;
    disabled?: boolean;
    error?: boolean;
}

const CustomButton: FunctionComponent<CustomButtonProps> = (props) => {

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (!props.disabled) {
            props.onClick();
        }
    }

    const calculateClasses = (): string => {
        const classes: string[] = [];
        if (props.disabled) { classes.push('disabled'); }
        if (props.error) { classes.push('error'); }
        return classes.join(' ');
    }

    return (
        <button className={calculateClasses()} onClick={(event) => onClick(event)}>
            {props.children}
        </button>
    )
}

export default CustomButton;