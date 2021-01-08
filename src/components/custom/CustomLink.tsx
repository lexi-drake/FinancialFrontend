import { FunctionComponent } from "react";

interface CustomLinkProps {
    onClick: () => void;
    first?: boolean;
    last?: boolean;
}

const CustomLink: FunctionComponent<CustomLinkProps> = (props) => {

    const calculateClasses = () => {
        const classes: string[] = ['custom-link'];
        if (props.first) { classes.push('first'); }
        if (props.last) { classes.push('last'); }
        return classes.join(' ');
    }
    return (
        <span className={calculateClasses()} onClick={() => props.onClick()}>{props.children}</span>
    );
}

export default CustomLink;