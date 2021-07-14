import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../../models/Frequency";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import { AppDataState } from "../../store/appdata";
import { deleteRecurringTransaction, getRecurringTransactions } from "../../store/ledger/actions";
import { MONTHS } from "../../utilities/constants";
import { getTotalRecurringTransactions } from "../../utilities/recurring_transactions";
import { formatCategoryAndDescription, numberToDollarString } from "../../utilities/utilities";
import Selector, { SelectorOption } from "../custom/Selector";
import RecurringTransactionModal from "./modals/RecurringTransactionModal";

interface RecurringTransactionListProps {
    recurringTransactions: RecurringTransaction[];
    frequencies: Frequency[];
    deleteRecurringTransaction: typeof deleteRecurringTransaction;
}

const RecurringTransactionList = (props: RecurringTransactionListProps) => {
    const [monthly, setMonthly] = useState('monthly');
    const [id, setId] = useState('');

    const total: number = getTotalRecurringTransactions(props.recurringTransactions, props.frequencies, monthly === 'monthly');

    const options: SelectorOption[] = [
        { value: 'monthly', description: MONTHS[new Date().getMonth()] },
        { value: 'yearly', description: new Date().getFullYear().toString() }
    ];

    const calculateAmount = (entry: RecurringTransaction): number =>
        entry.transactionType === 'Income' ? entry.amount : -entry.amount;

    const calculateAmountClasses = (amount: number): string => {
        const classes: string[] = ['amount'];
        if (amount <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    return (
        <div className="recurring-transaction-list">
            <div className="title">
                <h1>Expenses</h1>
            </div>
            <div className="time-period">
                <Selector value={monthly} options={options} onChange={(value) => setMonthly(value)} />
            </div>
            <div className="total">
                <div className={calculateAmountClasses(total)}>{numberToDollarString(total)}</div>
                <div className="title">Total</div>
            </div>
            <div className="list">
                {props.recurringTransactions.map(x => {
                    const amount: number = calculateAmount(x);
                    return (
                        <div key={x.id} className="recurring-transaction" onClick={() => setId(x.id)}>
                            <div className={calculateAmountClasses(amount)}>{numberToDollarString(amount)}</div>
                            <div className="description">{formatCategoryAndDescription(x.category, x.description)}</div>
                        </div>
                    );
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