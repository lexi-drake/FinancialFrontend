import { push } from "connected-react-router";
import { connect } from "react-redux";
import { AppDataState } from "../../store/appdata";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";

interface RecurringTransactionComponentProps {
    push: typeof push;
}

const RecurringTransactionComponent = (props: RecurringTransactionComponentProps) => {

    const onAddRecurringTransactionClick = () => {
        props.push('transaction/add');
    }

    return (
        <div className="recurring-transaction-list">
            <h1>Recurring transactions</h1>
            <Content>
                <CustomButton onClick={() => onAddRecurringTransactionClick()}>Add transaction</CustomButton>
            </Content>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<RecurringTransactionComponentProps> => {
    return {};
}

export default connect(mapStateToProps, { push })(RecurringTransactionComponent as any);