import { LedgerEntry } from "../../models/LedgerEntry";
import { getReadableDate } from "../../utilities/dates";

interface LedgerEntryComponentProps {
    entry: LedgerEntry;
}

const LedgerEntryComponent = (props: LedgerEntryComponentProps) => {

    const calculateAmountClasses = (): string => {
        const classes: string[] = ['amount'];
        if (props.entry.transactionType !== "Income") { classes.push('negative'); }
        return classes.join(' ');
    }

    return (
        <div className="ledger-entry">
            <div className="category">{props.entry.category}</div>
            <div className="date">{getReadableDate(props.entry.transactionDate)}</div>
            <span className={calculateAmountClasses()}>${props.entry.amount.toFixed(2)}</span>
            {!!props.entry.description &&
                <div className="description">{props.entry.description}</div>
            }
            <hr />
        </div>
    );
}

export default LedgerEntryComponent;