import { push } from "connected-react-router"
import { useState } from "react"
import { connect } from "react-redux"
import Frequency from "../../models/Frequency"
import { IncomeGenerator } from "../../models/IncomeGenerator"
import { AppDataState } from "../../store/appdata"
import { deleteIncomeGenerator } from "../../store/ledger/actions"
import { MONTHS } from "../../utilities/constants"
import Content from "../custom/Content"
import CustomButton from "../custom/CustomButton"
import CustomLink from "../custom/CustomLink"
import IncomeGeneratorSummary from "../transactions/IncomeGeneratorSummary"
import IncomeGeneratorModal from "./modals/IncomeGeneratorModal"
import { calculateIncome, getNumberOfTransactions } from "../../utilities/utilities"

interface IncomeGeneratorComponentProps {
    incomeGenerators: IncomeGenerator[];
    frequencies: Frequency[];
    deleteIncomeGenerator: typeof deleteIncomeGenerator;
    push: typeof push;
}

const IncomeGeneratorComponent = (props: IncomeGeneratorComponentProps) => {
    const [monthly, setMonthly] = useState(true);
    const [id, setId] = useState('');



    const onAddSourceOfIncomeClick = () => {
        props.push('/income/add');
    }

    const getTotal = (): number => {
        if (props.incomeGenerators.length === 0) {
            return 0;
        }
        return props.incomeGenerators
            .map(x => x.recurringTransactions
                .map(t => getNumberOfTransactions(t.lastTriggered, t.frequencyId, props.frequencies, monthly) * (t.transactionType === 'Income' ? t.amount : -t.amount)))
            .flat()
            .reduce((sum, x) => sum + x);
    }

    const calculateTotalClasses = (): string => {
        const classes: string[] = ['total'];
        if (getTotal() <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    return (
        <div className="income-generator-list">
            <h1>Sources of income</h1>
            <Content>
                {props.incomeGenerators.map(x =>
                    <IncomeGeneratorSummary key={x.id} id={x.id} description={x.description} income={calculateIncome(x, props.frequencies, monthly)} onClick={(value) => setId(value)} />)
                }
                <div className={calculateTotalClasses()}>${getTotal().toFixed(2)}</div>
                <CustomLink first onClick={() => setMonthly(true)}>{MONTHS[new Date().getMonth()]}</CustomLink>
                <CustomLink onClick={() => setMonthly(false)}>{new Date().getFullYear()}</CustomLink>
            </Content>
            <Content>
                <CustomButton onClick={() => onAddSourceOfIncomeClick()}>Add source of income</CustomButton>
            </Content>
            <IncomeGeneratorModal id={id} generators={props.incomeGenerators} deleteIncomeGenerator={props.deleteIncomeGenerator} frequencies={props.frequencies} close={() => setId('')} />
        </div>
    )
}

const mapStateToProps = (state: AppDataState): Partial<IncomeGeneratorComponentProps> => {
    return {
        incomeGenerators: state.ledger.incomeGenerators,
        frequencies: state.ledger.frequencies,
    };
}

export default connect(mapStateToProps, { deleteIncomeGenerator, push })(IncomeGeneratorComponent as any);