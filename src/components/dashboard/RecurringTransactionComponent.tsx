import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import { AppDataState } from "../../store/appdata";
import { deleteRecurringTransaction, getRecurringTransactions } from "../../store/ledger/actions";
import { MONTHS } from "../../utilities/constants";
import { UsesRecurringTransactions } from "../../utilities/hooks";
import { getAmountAndTimes } from "../../utilities/utilities";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import CustomLink from "../custom/CustomLink";
import RecurringTransactionSummary from "../transactions/RecurringTransactionSummary";
import RecurringTransactionModal from "./modals/RecurringTransactionModal";
import { getTimesPerMonthFromLastTriggeredAndFrequency, getTimesPerYearFromLastTriggeredAndFrequency } from "../../utilities/dates";

interface RecurringTransactionComponentProps {
    generators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    frequencies: Frequency[];
    getRecurringTransactions: typeof getRecurringTransactions;
    deleteRecurringTransaction: typeof deleteRecurringTransaction;
    push: typeof push;
}

const RecurringTransactionComponent = (props: RecurringTransactionComponentProps) => {
    const [monthly, setMonthly] = useState(true);
    const [id, setId] = useState('');

    UsesRecurringTransactions(props.getRecurringTransactions);

    const transactionsWithoutGenerators = (): RecurringTransaction[] => {
        const generatorTransactionIds: string[] = props.generators.map(x => x.recurringTransactions)
            .flat()
            .map(x => x.id);
        return props.recurringTransactions.filter(x => !generatorTransactionIds.includes(x.id));
    }
    const getNumberOfTransactions = (transaction: RecurringTransaction): number => {
        const lastTriggered: Date = transaction.lastTriggered;
        const frequencyId: string = transaction.frequencyId;

        if (monthly) {
            return getTimesPerMonthFromLastTriggeredAndFrequency(lastTriggered, frequencyId, props.frequencies);
        }
        return getTimesPerYearFromLastTriggeredAndFrequency(lastTriggered, frequencyId, props.frequencies)
    }

    const getTotal = (): number => {
        if (props.recurringTransactions.length === 0) {
            return 0;
        }
        return transactionsWithoutGenerators()
            .map(x => getNumberOfTransactions(x) * (x.transactionType === 'Income' ? x.amount : -x.amount))
            .reduce((sum, x) => sum + x);
    }

    const calculateTotalClasses = (): string => {
        const classes: string[] = ['total'];
        if (getTotal() <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    return (
        <div className="recurring-transaction-list">
            <h1>Recurring transactions</h1>
            <Content>
                {transactionsWithoutGenerators().map(x => {
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
                <div className={calculateTotalClasses()}>{getTotal().toFixed(2)}</div>
                <CustomLink first onClick={() => setMonthly(true)}>{MONTHS[new Date().getMonth()]}</CustomLink>
                <CustomLink onClick={() => setMonthly(false)}>{new Date().getFullYear()}</CustomLink>
            </Content>
            <Content>
                <CustomButton onClick={() => props.push('transaction/add')}>Add transaction</CustomButton>
            </Content>
            <RecurringTransactionModal id={id} transactions={props.recurringTransactions} getRecurringTransactions={props.getRecurringTransactions} deleteRecurringTransaction={props.deleteRecurringTransaction} frequencies={props.frequencies} close={() => setId('')} />
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<RecurringTransactionComponentProps> => {
    return {
        generators: state.ledger.incomeGenerators,
        recurringTransactions: state.ledger.recurringTransactions,
        frequencies: state.ledger.frequencies
    };
}

export default connect(mapStateToProps, { getRecurringTransactions, deleteRecurringTransaction, push })(RecurringTransactionComponent as any);