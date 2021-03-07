import { MAXIMUM_SELECTOR_STRING_LENGTH, MAXIMUM_SELECTOR_WIDTH_PX, MINIMUM_SELECTOR_BUTTON_WIDTH_PX } from "../../utilities/constants";

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

    const getButtonLayout = (): { width: number, vertical: boolean } => {
        if (props.options.length === 0) {
            return { width: 0, vertical: false };
        }
        const maxLabelLength = (): number => Math.max(...props.options.map(x => x.description.length));

        const totalMarginPx: number = (props.options.length - 1) * 16;
        const remainingPx: number = MAXIMUM_SELECTOR_WIDTH_PX - totalMarginPx;
        const buttonWidthPx: number = remainingPx / props.options.length;
        const vertical: boolean = buttonWidthPx < MINIMUM_SELECTOR_BUTTON_WIDTH_PX || maxLabelLength() > MAXIMUM_SELECTOR_STRING_LENGTH;

        return { width: vertical ? MAXIMUM_SELECTOR_WIDTH_PX : buttonWidthPx, vertical }
    }

    const { width, vertical } = getButtonLayout();

    const calculateButtonClasses = (index: number, checked: boolean): string => {
        const classes: string[] = ['selector-button'];
        if (checked) { classes.push('selected'); }
        classes.push(vertical ? 'vertical' : 'horizontal');
        if (index === 0) { classes.push('first'); }
        else if (index === props.options.length - 1) { classes.push('last'); }
        return classes.join(' ');
    }

    return (
        <div className="selector">
            {props.options.map((x, i) => {
                const checked: boolean = x.value === props.value;
                return (
                    <div key={i} className={calculateButtonClasses(i, checked)} style={{ width: width }} onClick={() => props.onChange(x.value)} >
                        <input type="radio" checked={checked} readOnly />
                        <div className="description">{x.description}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Selector;