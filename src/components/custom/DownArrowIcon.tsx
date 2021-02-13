
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
            <img src="./down-arrow.png" />
        </div>
    );
}

export default DownArrowIcon;