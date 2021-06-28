import { MAXIMUM_SELECTOR_WIDTH_PX } from "../../utilities/constants";

export interface SelectorOption {
    value: string;
    description: string;
}

interface SelectorProps {
    value: string;
    options: SelectorOption[];
    onChange: (value: string) => void;
}

const Selector = (props: SelectorProps) => {

    const getButtonWidth = (): number => {
        if (props.options.length === 0) {
            return 0;
        }
        const totalMarginPx: number = (props.options.length - 1) * 16;
        const remainingPx: number = MAXIMUM_SELECTOR_WIDTH_PX - totalMarginPx;
        const buttonWidthPx: number = Math.floor(remainingPx / props.options.length);

        return Math.floor(100 * buttonWidthPx / MAXIMUM_SELECTOR_WIDTH_PX);
    }

    const calculateButtonClasses = (index: number, checked: boolean): string => {
        const classes: string[] = ['selector-button'];
        if (checked) { classes.push('selected'); }
        if (index === 0) { classes.push('first'); }
        else if (index === props.options.length - 1) { classes.push('last'); }
        return classes.join(' ');
    }

    return (
        <div className="selector">
            {props.options.map((x, i) => {
                const checked: boolean = x.value === props.value;
                return (
                    <div key={i} className={calculateButtonClasses(i, checked)} style={{ width: `${getButtonWidth()}%` }} onClick={() => props.onChange(x.value)} >
                        <input type="radio" checked={checked} readOnly />
                        {x.description}
                    </div>
                );
            })}
        </div>
    );
}

export default Selector;