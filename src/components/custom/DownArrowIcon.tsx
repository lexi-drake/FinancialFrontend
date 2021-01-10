
interface DownArrowIconProps {
    onClick?: () => void;
}

const DownArrowIcon = (props: DownArrowIconProps) => {

    const onClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <div className="icon" onClick={() => onClick()}>
            <svg>
                {/* TODO (alexa): needs icon. */}
            </svg>
        </div>
    );
}

export default DownArrowIcon;