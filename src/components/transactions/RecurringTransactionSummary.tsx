interface RecurringTransactionSummaryProps {
    amount: number;
    total: number;
    times: string;
    category: string;
    description: string;
    onClick: () => void;
}

const RecurringTransactionSummary = (props: RecurringTransactionSummaryProps) => {

    const calculateAmountClasses = (): string => {
        const classes: string[] = ['amount'];
        if (props.total <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }


    return (
        <div className="recurring-transaction" onClick={() => props.onClick()}>
            <div className="category">{props.category}</div>
            <div className="times">{`$${props.amount.toFixed(2)} x ${props.times}`}</div>
            <span className={calculateAmountClasses()}>${props.total.toFixed(2)}</span>
            {!!props.description &&
                <div className="description">{props.description}</div>
            }
        </div>
    );
}

export default RecurringTransactionSummary;