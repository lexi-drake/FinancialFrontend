import Frequency from "../../models/Frequency";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import { getTimesPerMonthFromLastTriggeredAndFrequency, getTimesPerYearFromLastTriggeredAndFrequency } from "../../utilities/dates";

interface RecurringTransactionSummaryProps {
    transaction: RecurringTransaction;
    frequencies: Frequency[];
    monthly: boolean;
    onClick: (value: string) => void;
}

const RecurringTransactionSummary = (props: RecurringTransactionSummaryProps) => {

    const calculateAmountClasses = (): string => {
        const classes: string[] = ['amount'];
        if (props.transaction.transactionType !== "Income") { classes.push('negative'); }
        return classes.join(' ');
    }

    const getTimesPerMonth = (): [number, string] => {
        const timesPerMonth: number = getTimesPerMonthFromLastTriggeredAndFrequency(props.transaction.lastTriggered, props.transaction.frequencyId, props.frequencies);
        const amount: number = timesPerMonth * props.transaction.amount;
        if (timesPerMonth < 1) {
            return [amount, timesPerMonth.toFixed(2)];
        }
        return [amount, timesPerMonth.toFixed(0)];
    }

    const getTimesPerYear = (): [number, string] => {
        const timesPerYear: number = getTimesPerYearFromLastTriggeredAndFrequency(props.transaction.lastTriggered, props.transaction.frequencyId, props.frequencies);
        const amount: number = timesPerYear * props.transaction.amount;
        return [amount, timesPerYear.toFixed(0)];
    }

    const [amount, times] = props.monthly ? getTimesPerMonth() : getTimesPerYear();

    return (
        <div className="recurring-transaction" onClick={() => props.onClick(props.transaction.id)}>
            <div className="category">{props.transaction.category}</div>
            <div className="times">{`$${props.transaction.amount.toFixed(2)} x ${times}`}</div>
            <span className={calculateAmountClasses()}>${amount.toFixed(2)}</span>
            {!!props.transaction.description &&
                <div className="description">{props.transaction.description}</div>
            }
            <hr />
        </div>
    );
}

export default RecurringTransactionSummary;