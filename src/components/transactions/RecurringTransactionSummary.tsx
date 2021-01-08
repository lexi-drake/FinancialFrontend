import { RecurringTransactionRequest } from "../../models/RecurringTransaction"
import TransactionType from "../../models/TransactionType"

interface RecurringTransactionSummaryProps {
    transaction: RecurringTransactionRequest;
    types: TransactionType[];
}

const RecurringTransactionSummary = (props: RecurringTransactionSummaryProps) => {

    const getReadableType = (): string => {
        return props.types.filter(x => x.id === props.transaction.transactionTypeId)[0].description;
    }

    return (
        <div className="recurring-transaction-summary">

            <span className="category">{props.transaction.category}</span>
            <span className="type">{getReadableType()}</span>

            <span className="amount">${props.transaction.amount.toFixed(2)}</span>

            {!!props.transaction.description &&
                <div className="description">{props.transaction.description}</div>
            }
            <div className="after" />
        </div >
    );
}

export default RecurringTransactionSummary;