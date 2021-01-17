import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator";
import { RecurringTransaction } from "../../models/RecurringTransaction";
import { AppDataState } from "../../store/appdata";
import { MONTHS } from "../../utilities/constants";
import Content from "../custom/Content";
import CustomButton from "../custom/CustomButton";
import CustomLink from "../custom/CustomLink";
import RecurringTransactionSummary from "../transactions/RecurringTransactionSummary";

interface RecurringTransactionComponentProps {
    generators: IncomeGenerator[];
    recurringTransactions: RecurringTransaction[];
    frequencies: Frequency[];
    push: typeof push;
}

const RecurringTransactionComponent = (props: RecurringTransactionComponentProps) => {
    const [monthly, setMonthly] = useState(true);

    const onAddRecurringTransactionClick = () => {
        props.push('transaction/add');
    }

    const transactionsWithoutGenerators = (): RecurringTransaction[] => {
        const generatorTransactionIds: string[] = props.generators.map(x => x.recurringTransactions)
            .flat()
            .map(x => x.id);
        return props.recurringTransactions.filter(x => !generatorTransactionIds.includes(x.id));
    }

    return (
        <div className="recurring-transaction-list">
            <h1>Recurring transactions</h1>
            <Content>
                {transactionsWithoutGenerators().map(x =>
                    <RecurringTransactionSummary key={x.id} transaction={x} frequencies={props.frequencies} monthly={monthly} />)
                }
                <CustomLink first onClick={() => setMonthly(true)}>{MONTHS[new Date().getMonth()]}</CustomLink>
                <CustomLink onClick={() => setMonthly(false)}>{new Date().getFullYear()}</CustomLink>
            </Content>
            <Content>
                <CustomButton onClick={() => onAddRecurringTransactionClick()}>Add transaction</CustomButton>
            </Content>
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

export default connect(mapStateToProps, { push })(RecurringTransactionComponent as any);