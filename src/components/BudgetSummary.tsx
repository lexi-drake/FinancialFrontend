import { connect } from "react-redux";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { AppDataState } from "../store/appdata";
import { MONTHS } from "../utilities/constants";
import { getTotalIncomeGenerators } from "../utilities/income_generators";
import { getTotalRecurringTransactions } from "../utilities/recurring_transactions";

interface IBudgetSummaryProps {
    month: number;
    frequencies: Frequency[];
    incomeGenerators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    ledgerEntries: LedgerEntry[];
}

const BudgetSummary = (props: IBudgetSummaryProps) => {

    const budgetText = (): string => {

        const calculateTotalEntries = (): number => {

            const isRecurringTransaction = (entry: LedgerEntry): boolean => {
                if (!entry.recurringTransactionId) {
                    return false;
                }
                const recurringTransactions: string[] = [
                    ...props.incomeGenerators.map(x => x.recurringTransactions.map(y => y.id)).flat(),
                    ...props.recurringTransactions.map(x => x.id)
                ]
                return recurringTransactions.includes(entry.recurringTransactionId);
            }

            if (props.ledgerEntries.length === 0) {
                return 0;
            }
            return props.ledgerEntries.filter(x => !isRecurringTransaction(x))
                .map(x => {
                    return x.transactionType === 'Income' ? x.amount : -x.amount
                })
                .reduce((sum, x) => sum + x, 0);
        }

        if (props.month === 0) {
            const income: number = getTotalIncomeGenerators(props.incomeGenerators, props.frequencies, true);
            const recurringTransactions: number = getTotalRecurringTransactions(props.recurringTransactions, props.frequencies, true);
            const transactions: number = calculateTotalEntries();
            const total = Math.max(income + recurringTransactions + transactions, 0);

            return props.month === 0 ? `Remaining budget for ${MONTHS[new Date().getMonth()]}: $${total.toFixed(2)}` : 'No budget data available for this month.';
        }
        return 'No budget information available for this month.';
    }

    return (
        <div className="budget-summary">
            {budgetText()}
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<IBudgetSummaryProps> => {
    return {
        month: state.ledger.month,
        frequencies: state.ledger.frequencies,
        incomeGenerators: state.ledger.incomeGenerators,
        recurringTransactions: state.ledger.recurringTransactions,
        ledgerEntries: state.ledger.ledgerEntries
    };
}

export default connect(mapStateToProps, {})(BudgetSummary as any);