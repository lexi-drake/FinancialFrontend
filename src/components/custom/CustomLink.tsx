import { FunctionComponent } from "react";

interface CustomLinkProps {
    onClick: () => void;
}

const CustomLink: FunctionComponent<CustomLinkProps> = (props) => {
    return (
        <span className="custom-link" onClick={() => props.onClick()}>{props.children}</span>
    );
}

export default CustomLink;