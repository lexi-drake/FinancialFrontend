import { push } from "connected-react-router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { LedgerEntry } from "../../models/LedgerEntry";
import TransactionType from "../../models/TransactionType";
import { AppDataState } from "../../store/appdata";
import { getLedgerEntries } from "../../store/ledger/actions";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utilities/dates";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import LedgerEntryComponent from "./LedgerEntryComponent";

interface LedgerHistoryComponentProps {
    ledgerEntries: LedgerEntry[];
    transactionTypes: TransactionType[];
    getLedgerEntries: typeof getLedgerEntries;
    push: typeof push;
}

const LedgerHistoryComponent = (props: LedgerHistoryComponentProps) => {

    useEffect(() => {
        const getLedgerEntries = props.getLedgerEntries;
        if (props.ledgerEntries.length === 0) {
            getLedgerEntries({
                start: getFirstDayOfMonth(),
                end: getLastDayOfMonth()
            });
        }
    }, [props.ledgerEntries, props.getLedgerEntries]);

    const onAddTransactionClick = () => {
        props.push('ledger/add');
    }

    return (
        <div className="ledger-history-component">
            <h1>Transaction history</h1>
            <Content>
                <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
            </Content>
            <Content>
                {props.ledgerEntries.map(x =>
                    <LedgerEntryComponent key={x.id} entry={x} types={props.transactionTypes} />)
                }
            </Content>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<LedgerHistoryComponentProps> => {
    return {
        ledgerEntries: state.ledger.ledgerEntries,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getLedgerEntries, push })(LedgerHistoryComponent as any);