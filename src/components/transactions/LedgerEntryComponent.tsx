import { LedgerEntry } from "../../models/LedgerEntry";

interface LedgerEntryComponentProps {
    entry: LedgerEntry;
}

const LedgerEntryComponent = (props: LedgerEntryComponentProps) => {

    const getAmount = (): string => {
        const amount: number = props.entry.transactionType === "Income" ? props.entry.amount : -props.entry.amount;
        return amount.toFixed(2);
    }

    return (
        <div className="ledger-entry">
            <span className="category">{props.entry.category}</span>
            <span className="description">{props.entry.description}</span>
            <span className="amount">{getAmount()}</span>
        </div>
    );
}

export default LedgerEntryComponent;