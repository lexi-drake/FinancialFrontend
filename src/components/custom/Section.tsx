import { FunctionComponent } from "react";

interface SectionProps {
    disabled?: boolean;
}

const Section: FunctionComponent<SectionProps> = (props) => {

    const calculateClasses = (): string => {
        const classes: string[] = ['section'];
        if (props.disabled) { classes.push('disabled'); }
        return classes.join(' ');
    }

    return (
        <div className={calculateClasses()}>
            {props.children}
        </div>
    )
}

export default Section;