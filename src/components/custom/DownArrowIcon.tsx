interface DownArrowIconProps {
    onClick?: () => void;
}

const DownArrowIcon = (props: DownArrowIconProps) => {

    const onClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    const path: string = `${process.env.PUBLIC_URL}/down-arrow.png`;

    return (
        <div className="icon" onClick={() => onClick()}>
            <img src={path} alt="" />
        </div>
    );
}

export default DownArrowIcon;