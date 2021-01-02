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

    return (
        <div className="custom-button" onClick={() => onClick()}>
            {props.children}
        </div>
    )
}

export default CustomButton;