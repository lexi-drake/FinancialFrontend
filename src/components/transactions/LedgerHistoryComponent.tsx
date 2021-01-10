import { push } from "connected-react-router";
import { connect } from "react-redux";
import { LedgerEntry } from "../../models/LedgerEntry";
import { AppDataState } from "../../store/appdata";
import { getLedgerEntries } from "../../store/ledger/actions";
import { usesLedgerEntries } from "../../utilities/hooks";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import LedgerEntryComponent from "./LedgerEntryComponent";

interface LedgerHistoryComponentProps {
    ledgerEntries: LedgerEntry[];
    getLedgerEntries: typeof getLedgerEntries;
    push: typeof push;
}

const LedgerHistoryComponent = (props: LedgerHistoryComponentProps) => {

    usesLedgerEntries(props.ledgerEntries, props.getLedgerEntries);

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
                    <LedgerEntryComponent key={x.id} entry={x} />)
                }
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