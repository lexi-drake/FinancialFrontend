import { useState } from "react"
import { connect } from "react-redux"
import Frequency from "../../models/Frequency"
import { IncomeGenerator } from "../../models/IncomeGenerator"
import { AppDataState } from "../../store/appdata"
import { deleteIncomeGenerator } from "../../store/ledger/actions"
import { MONTHS } from "../../utilities/constants"
import { calculateIncome, getTotalIncomeGenerators } from "../../utilities/income_generators"
import Selector, { SelectorOption } from "../custom/Selector"
import IncomeGeneratorModal from "./modals/IncomeGeneratorModal"
import { numberToDollarString } from "../../utilities/utilities"

interface IncomeGeneratorListProps {
    incomeGenerators: IncomeGenerator[];
    frequencies: Frequency[];
    deleteIncomeGenerator: typeof deleteIncomeGenerator;
}

const IncomeGeneratorList = (props: IncomeGeneratorListProps) => {
    const [monthly, setMonthly] = useState('monthly');
    const [id, setId] = useState('');

    const total: number = getTotalIncomeGenerators(props.incomeGenerators, props.frequencies, monthly === 'monthly');

    const calculateAmountClasses = (amount: number): string => {
        const classes: string[] = ['amount'];
        if (amount <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    const options: SelectorOption[] = [
        { value: 'monthly', description: MONTHS[new Date().getMonth()] },
        { value: 'yearly', description: new Date().getFullYear().toString() }
    ];

    return (
        <div className="income-generator-list">
            <h1 className="title">Sources of income</h1>
            <div className="time-period">
                <Selector value={monthly} options={options} onChange={(value) => setMonthly(value)} />
            </div>
            <div className="total">
                <div className={calculateAmountClasses(total)}>{numberToDollarString(total)}</div>
                <div className="title">Total</div>
            </div>
            <div className="list">
                {props.incomeGenerators.map(x => {
                    const amount: number = calculateIncome(x, props.frequencies, monthly === 'monthly')
                    return (
                        <div className="income-generator" onClick={() => setId(x.id)}>
                            <div className={calculateAmountClasses(amount)}>{numberToDollarString(amount)}</div>
                            <div className="description">{x.description}</div>

                        </div>
                    )
                }
                )}
            </div>
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