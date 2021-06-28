import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../models/Frequency";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { AppDataState } from "../store/appdata";
import { deleteRecurringTransaction, getRecurringTransactions } from "../store/ledger/actions";
import { MONTHS } from "../utilities/constants";
import { getTotalRecurringTransactions } from "../utilities/recurring_transactions";
import { getAmountAndTimes } from "../utilities/utilities";
import Content from "./custom/Content";
import Selector, { SelectorOption } from "./custom/Selector";
import RecurringTransactionSummary from "./transactions/RecurringTransactionSummary";
import RecurringTransactionModal from "./dashboard/modals/RecurringTransactionModal";

interface RecurringTransactionListProps {
    recurringTransactions: RecurringTransaction[];
    frequencies: Frequency[];
    deleteRecurringTransaction: typeof deleteRecurringTransaction;
}

const RecurringTransactionList = (props: RecurringTransactionListProps) => {
    const [monthly, setMonthly] = useState('monthly');
    const [id, setId] = useState('');

    const total: number = getTotalRecurringTransactions(props.recurringTransactions, props.frequencies, monthly === 'monthly');

    const calculateTotalClasses = (): string => {
        const classes: string[] = ['total'];
        if (total <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    const options: SelectorOption[] = [
        { value: 'monthly', description: MONTHS[new Date().getMonth()] },
        { value: 'yearly', description: new Date().getFullYear().toString() }
    ]

    return (
        <div className="recurring-transaction-list">
            <div className="title">
                <h1>Expenses</h1>
            </div>
            <div className="time-period">
                <Selector value={monthly} options={options} onChange={(value) => setMonthly(value)} />
            </div>
            <div className={calculateTotalClasses()}>Total: {total.toFixed(2)}</div>
            <div className="list">
                {props.recurringTransactions.map(x => {
                    const [total, times] = getAmountAndTimes(x, props.frequencies, monthly === 'monthly');
                    return <RecurringTransactionSummary
                        key={x.id}
                        amount={x.amount}
                        total={total}
                        times={times}
                        category={x.category}
                        description={x.description}
                        onClick={() => setId(x.id)} />
                })
                }
            </div>
            <RecurringTransactionModal id={id} transactions={props.recurringTransactions} deleteRecurringTransaction={props.deleteRecurringTransaction} frequencies={props.frequencies} close={() => setId('')} />
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<RecurringTransactionListProps> => {
    return {
        recurringTransactions: state.ledger.recurringTransactions,
        frequencies: state.ledger.frequencies
    };
}

export default connect(mapStateToProps, { getRecurringTransactions, deleteRecurringTransaction })(RecurringTransactionList as any);