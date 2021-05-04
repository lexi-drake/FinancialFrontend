import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator";
import { LedgerEntry } from "../../models/LedgerEntry";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import { AppDataState } from "../../store/appdata";
import { deleteLedgerEntry, getLedgerEntries } from "../../store/ledger/actions";
import { MONTHS } from "../../utilities/constants";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utilities/dates";
import { getTotalIncomeGenerators } from "../../utilities/income_generators";
import { getTotalRecurringTransactions } from "../../utilities/recurring_transactions";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import CustomDropdown, { DropdownOption } from "../custom/CustomDropdown";
import LedgerEntryComponent from "../transactions/LedgerEntryComponent";
import LedgerHistoryGraph from "./LedgerHistoryGraph";
import LedgerEntryModal from "./modals/LedgerEntryModal";

interface LedgerHistoryComponentProps {
    ledgerEntries: LedgerEntry[];
    incomeGenerators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    frequencies: Frequency[];
    getLedgerEntries: typeof getLedgerEntries;
    deleteLedgerEntry: typeof deleteLedgerEntry;
    push: typeof push;
}

const LedgerHistoryComponent = (props: LedgerHistoryComponentProps) => {
    const [month, setMonth] = useState(0);
    const [id, setId] = useState('');

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

        if (month === 0) {
            const income: number = getTotalIncomeGenerators(props.incomeGenerators, props.frequencies, true);
            const recurringTransactions: number = getTotalRecurringTransactions(props.recurringTransactions, props.frequencies, true);
            const transactions: number = calculateTotalEntries();
            const total = Math.max(income + recurringTransactions + transactions, 0);

            return month === 0 ? `Remaining budget for ${MONTHS[new Date().getMonth()]}: $${total.toFixed(2)}` : 'No budget data available for this month.';
        }
        return 'No budget information available for this month.';
    }

    const onAddTransactionClick = () => {
        props.push('ledger/add');
    }

    const createMonthOptions = (): DropdownOption[] => {
        const options: DropdownOption[] = [];
        for (let i = 0; i < 12; i++) {
            const date: Date = new Date();
            date.setMonth(date.getMonth() - i);
            options.push({ key: i.toString(), value: i.toString(), text: `${MONTHS[date.getMonth()]}, ${date.getFullYear()}` });
        }
        return options;
    }

    const setMonthString = (value: string) => {
        const numberValue: number = parseInt(value);
        if (!isNaN(numberValue)) {
            setMonth(numberValue);
            let date: Date = new Date();
            date = new Date(date.getFullYear(), date.getMonth() - numberValue, date.getDate());
            props.getLedgerEntries({
                start: getFirstDayOfMonth(date.getFullYear(), date.getMonth()),
                end: getLastDayOfMonth(date.getFullYear(), date.getMonth())
            });
        }
    }

    const getTotal = (): number => {
        if (props.ledgerEntries.length === 0) {
            return 0;
        }
        return props.ledgerEntries
            .map(x => x.transactionType === 'Income' ? x.amount : -x.amount)
            .reduce((sum, x) => sum + x);
    }

    const calculateTotalClasses = (): string => {
        const classes: string[] = ['total'];
        if (getTotal() <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    const onModalClose = () => {
        setId('');
        setMonth(new Date().getMonth());
    }

    return (
        <div className="ledger-history">
            <h1>Transaction history</h1>
            <p>{budgetText()}</p>
            {props.ledgerEntries.length > 0 &&
                <Content>
                    <LedgerHistoryGraph ledgerEntries={props.ledgerEntries} />
                </Content>
            }
            <Content>
                <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                <CustomDropdown label="Transaction history for the month of" value={month.toString()} options={createMonthOptions()} onSelect={(value) => setMonthString(value)} />
                <div className="after" />
            </Content>
            <Content>
                {props.ledgerEntries.map(x =>
                    <LedgerEntryComponent key={x.id} entry={x} onClick={(value) => setId(value)} />)
                }
                <div className={calculateTotalClasses()}>${getTotal().toFixed(2)}</div>
            </Content>
            <LedgerEntryModal id={id} entries={props.ledgerEntries} getLedgerEntries={props.getLedgerEntries} deleteLedgerEntry={props.deleteLedgerEntry} close={() => onModalClose()} />
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<LedgerHistoryComponentProps> => {
    return {
        ledgerEntries: state.ledger.ledgerEntries,
        incomeGenerators: state.ledger.incomeGenerators,
        recurringTransactions: state.ledger.recurringTransactions,
        frequencies: state.ledger.frequencies
    };
}

export default connect(mapStateToProps, { getLedgerEntries, deleteLedgerEntry, push })(LedgerHistoryComponent as any);