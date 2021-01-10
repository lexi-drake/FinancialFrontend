import { LedgerEntry } from "../../models/LedgerEntry";
import TransactionType from "../../models/TransactionType";

interface LedgerEntryComponentProps {
    entry: LedgerEntry;
    types: TransactionType[];
}

const LedgerEntryComponent = (props: LedgerEntryComponentProps) => {

    const getAmount = (): string => {
        const type = props.types.filter(x => x.id == props.entry.transactionTypeId)[0];
        const amount: number = type.description === "Income" ? props.entry.amount : -props.entry.amount;
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