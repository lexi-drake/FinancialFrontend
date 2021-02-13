import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../../models/Frequency";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import { AppDataState } from "../../store/appdata";
import { deleteRecurringTransaction, getRecurringTransactions } from "../../store/ledger/actions";
import { MONTHS } from "../../utilities/constants";
import { getTotalRecurringTransactions } from "../../utilities/recurring_transactions";
import { getAmountAndTimes } from "../../utilities/utilities";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import CustomLink from "../custom/CustomLink";
import RecurringTransactionSummary from "../transactions/RecurringTransactionSummary";
import RecurringTransactionModal from "./modals/RecurringTransactionModal";

interface RecurringTransactionComponentProps {
    recurringTransactions: RecurringTransaction[];
    frequencies: Frequency[];
    deleteRecurringTransaction: typeof deleteRecurringTransaction;
    push: typeof push;
}

const RecurringTransactionComponent = (props: RecurringTransactionComponentProps) => {
    const [monthly, setMonthly] = useState(true);
    const [id, setId] = useState('');

    const total: number = getTotalRecurringTransactions(props.recurringTransactions, props.frequencies, monthly);

    const calculateTotalClasses = (): string => {
        const classes: string[] = ['total'];
        if (total <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    return (
        <div className="recurring-transaction-list">
            <h1>Recurring transactions</h1>
            <Content>
                {props.recurringTransactions.map(x => {
                    const [total, times] = getAmountAndTimes(x, props.frequencies, monthly);
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
                <div className={calculateTotalClasses()}>{total.toFixed(2)}</div>
                <CustomLink first onClick={() => setMonthly(true)}>{MONTHS[new Date().getMonth()]}</CustomLink>
                <CustomLink onClick={() => setMonthly(false)}>{new Date().getFullYear()}</CustomLink>
            </Content>
            <Content>
                <CustomButton onClick={() => props.push('transaction/add')}>Add transaction</CustomButton>
            </Content>
            <RecurringTransactionModal id={id} transactions={props.recurringTransactions} deleteRecurringTransaction={props.deleteRecurringTransaction} frequencies={props.frequencies} close={() => setId('')} />
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<RecurringTransactionComponentProps> => {
    return {
        recurringTransactions: state.ledger.recurringTransactions,
        frequencies: state.ledger.frequencies
    };
}

export default connect(mapStateToProps, { getRecurringTransactions, deleteRecurringTransaction, push })(RecurringTransactionComponent as any);