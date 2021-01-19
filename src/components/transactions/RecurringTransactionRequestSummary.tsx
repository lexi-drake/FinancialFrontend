import { RecurringTransactionRequest } from "../../models/RecurringTransaction"
import TransactionType from "../../models/TransactionType"

interface RecurringTransactionRequestSummaryProps {
    transaction: RecurringTransactionRequest;
    types: TransactionType[];
    onClick: (value: string) => void;
}

const RecurringTransactionRequestSummary = (props: RecurringTransactionRequestSummaryProps) => {

    const getReadableType = (): string => {
        return props.types.filter(x => x.id === props.transaction.transactionTypeId)[0].description;
    }

    return (
        <div className="recurring-transaction-summary">

            <span className="category">{props.transaction.category}</span>
            <span className="type">{getReadableType()}</span>

            <span className="after" onClick={() => props.onClick(props.transaction.description)} />
            <span className="amount">${props.transaction.amount.toFixed(2)}</span>

            {!!props.transaction.description &&
                <div className="description">{props.transaction.description}</div>
            }
        </div >
    );
}

export default RecurringTransactionRequestSummary;