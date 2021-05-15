import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { LedgerEntry } from "../models/LedgerEntry";
import { RecurringTransaction } from "../models/RecurringTransaction";
import { AppDataState } from "../store/appdata";
import { deleteLedgerEntry, getLedgerEntries } from "../store/ledger/actions";
import { MONTHS } from "../utilities/constants";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utilities/dates";
import Content from "./custom/Content";
import CustomButton from "./custom/CustomButton";
import CustomDropdown, { DropdownOption } from "./custom/CustomDropdown";
import LedgerEntryComponent from "./transactions/LedgerEntryComponent";
import LedgerEntryModal from "./dashboard/modals/LedgerEntryModal";

interface LedgerHistoryListProps {
    ledgerEntries: LedgerEntry[];
    incomeGenerators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    frequencies: Frequency[];
    getLedgerEntries: typeof getLedgerEntries;
    deleteLedgerEntry: typeof deleteLedgerEntry;
    push: typeof push;
}

const LedgerHistoryList = (props: LedgerHistoryListProps) => {
    const [month, setMonth] = useState(0);
    const [id, setId] = useState('');

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
        <div className="ledger-history-list">
            <h1>Transaction history</h1>
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

const mapStateToProps = (state: AppDataState): Partial<LedgerHistoryListProps> => {
    return {
        ledgerEntries: state.ledger.ledgerEntries,
        incomeGenerators: state.ledger.incomeGenerators,
        recurringTransactions: state.ledger.recurringTransactions,
        frequencies: state.ledger.frequencies
    };
}

export default connect(mapStateToProps, { getLedgerEntries, deleteLedgerEntry, push })(LedgerHistoryList as any);