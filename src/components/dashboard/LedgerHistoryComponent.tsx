import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import { LedgerEntry } from "../../models/LedgerEntry";
import { AppDataState } from "../../store/appdata";
import { getLedgerEntries } from "../../store/ledger/actions";
import { MONTHS } from "../../utilities/constants";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utilities/dates";
import { UsesLedgerEntries } from "../../utilities/hooks";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import CustomDropdown, { DropdownOption } from "../custom/CustomDropdown";
import LedgerEntryComponent from "../transactions/LedgerEntryComponent";
import LedgerHistoryGraph from "./LedgerHistoryGraph";

interface LedgerHistoryComponentProps {
    ledgerEntries: LedgerEntry[];
    getLedgerEntries: typeof getLedgerEntries;
    push: typeof push;
}

const LedgerHistoryComponent = (props: LedgerHistoryComponentProps) => {
    const [month, setMonth] = useState(new Date().getMonth());

    UsesLedgerEntries(props.getLedgerEntries);

    const onAddTransactionClick = () => {
        props.push('ledger/add');
    }

    const createMonthOptions = (): DropdownOption[] => {
        const options: DropdownOption[] = [];
        for (let i = 0; i < 12; i++) {
            const date: Date = new Date();
            date.setMonth(date.getMonth() - i);
            options.push({ key: i.toString(), value: date.getMonth().toString(), text: `${MONTHS[date.getMonth()]}, ${date.getFullYear()}` });
        }
        return options;
    }

    const setMonthString = (value: string) => {
        const numberValue: number = parseInt(value);
        if (!isNaN(numberValue)) {
            setMonth(numberValue);
            const date: Date = new Date();
            const monthOffset = date.getMonth() + (12 - numberValue) % -12;
            date.setMonth(date.getMonth() - monthOffset);
            props.getLedgerEntries({
                start: getFirstDayOfMonth(date.getFullYear(), date.getMonth()),
                end: getLastDayOfMonth(date.getFullYear(), date.getMonth())
            });
        }
    }

    const getLedgerEntriesForMonth = (month: number): LedgerEntry[] => {
        const date = new Date();
        date.setMonth(month);
        return props.ledgerEntries
            .filter(x => x.transactionDate.getTime() > getFirstDayOfMonth(date.getFullYear(), month).getTime())
            .filter(x => x.transactionDate.getTime() < getLastDayOfMonth(date.getFullYear(), month).getTime())
            .sort((a, b) => b.transactionDate.getTime() - a.transactionDate.getTime());
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

    return (
        <div className="ledger-history">
            <h1>Transaction history</h1>
            {props.ledgerEntries.length > 0 &&
                <Content>
                    <LedgerHistoryGraph ledgerEntries={getLedgerEntriesForMonth(month)} />
                </Content>
            }
            <Content>
                <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                <CustomDropdown label="Transaction history for the month of" value={month.toString()} options={createMonthOptions()} onSelect={(value) => setMonthString(value)} />
                <div className="after" />
            </Content>
            <Content>
                {getLedgerEntriesForMonth(month).map(x =>
                    <LedgerEntryComponent key={x.id} entry={x} />)
                }
                <div className={calculateTotalClasses()}>${getTotal().toFixed()}</div>
            </Content>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<LedgerHistoryComponentProps> => {
    return {
        ledgerEntries: state.ledger.ledgerEntries,
    };
}

export default connect(mapStateToProps, { getLedgerEntries, push })(LedgerHistoryComponent as any);