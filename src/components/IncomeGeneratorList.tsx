import { useState } from "react"
import { connect } from "react-redux"
import Frequency from "../models/Frequency"
import { IncomeGenerator } from "../models/IncomeGenerator"
import { AppDataState } from "../store/appdata"
import { deleteIncomeGenerator } from "../store/ledger/actions"
import { MONTHS } from "../utilities/constants"
import { calculateIncome, getTotalIncomeGenerators } from "../utilities/income_generators"
import Content from "./custom/Content"
import Selector, { SelectorOption } from "./custom/Selector"
import IncomeGeneratorSummary from "./transactions/IncomeGeneratorSummary"
import IncomeGeneratorModal from "./dashboard/modals/IncomeGeneratorModal"

interface IncomeGeneratorListProps {
    incomeGenerators: IncomeGenerator[];
    frequencies: Frequency[];
    deleteIncomeGenerator: typeof deleteIncomeGenerator;
}

const IncomeGeneratorList = (props: IncomeGeneratorListProps) => {
    const [monthly, setMonthly] = useState('monthly');
    const [id, setId] = useState('');

    const total: number = getTotalIncomeGenerators(props.incomeGenerators, props.frequencies, monthly === 'monthly');

    const calculateTotalClasses = (): string => {
        const classes: string[] = ['total'];
        if (total <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    const options: SelectorOption[] = [
        { value: 'monthly', description: MONTHS[new Date().getMonth()] },
        { value: 'yearly', description: new Date().getFullYear().toString() }
    ];

    return (
        <div className="income-generator-list">
            <h1>Sources of income</h1>
            <Content>
                {props.incomeGenerators.map(x =>
                    <IncomeGeneratorSummary key={x.id} id={x.id} description={x.description} income={calculateIncome(x, props.frequencies, monthly === 'monthly')} onClick={(value) => setId(value)} />)
                }
                <div className={calculateTotalClasses()}>${total.toFixed(2)}</div>
            </Content>
            <Content>
                <Selector value={monthly} options={options} onChange={(value) => setMonthly(value)} />
            </Content>
            <IncomeGeneratorModal id={id} generators={props.incomeGenerators} deleteIncomeGenerator={props.deleteIncomeGenerator} frequencies={props.frequencies} close={() => setId('')} />
        </div >
    )
}

const mapStateToProps = (state: AppDataState): Partial<IncomeGeneratorListProps> => {
    return {
        incomeGenerators: state.ledger.incomeGenerators,
        frequencies: state.ledger.frequencies,
    };
}

export default connect(mapStateToProps, { deleteIncomeGenerator })(IncomeGeneratorList as any);