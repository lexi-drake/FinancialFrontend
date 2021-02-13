import { push } from "connected-react-router"
import { useState } from "react"
import { connect } from "react-redux"
import Frequency from "../../models/Frequency"
import { IncomeGenerator } from "../../models/IncomeGenerator"
import { AppDataState } from "../../store/appdata"
import { deleteIncomeGenerator, getIncomeGenerators } from "../../store/ledger/actions"
import { MONTHS } from "../../utilities/constants"
import { UsesIncomeGenerators } from "../../utilities/hooks"
import Content from "../custom/Content"
import CustomButton from "../custom/CustomButton"
import CustomLink from "../custom/CustomLink"
import IncomeGeneratorSummary from "../transactions/IncomeGeneratorSummary"
import IncomeGeneratorModal from "./modals/IncomeGeneratorModal"
import { getTimesPerMonthFromLastTriggeredAndFrequency, getTimesPerYearFromLastTriggeredAndFrequency } from "../../utilities/dates";

interface IncomeGeneratorComponentProps {
    incomeGenerators: IncomeGenerator[];
    frequencies: Frequency[];
    getIncomeGenerators: typeof getIncomeGenerators;
    deleteIncomeGenerator: typeof deleteIncomeGenerator;
    push: typeof push;
}

const IncomeGeneratorComponent = (props: IncomeGeneratorComponentProps) => {
    const [monthly, setMonthly] = useState(true);
    const [id, setId] = useState('');

    UsesIncomeGenerators(props.getIncomeGenerators);

    const getNumberOfTransactions = (generator: IncomeGenerator): number => {
        if (generator.recurringTransactions.length === 0) {
            return 0;
        }
        const lastTriggered: Date = generator.recurringTransactions[0].lastTriggered;
        const frequencyId: string = generator.frequencyId;

        if (monthly) {
            return getTimesPerMonthFromLastTriggeredAndFrequency(lastTriggered, frequencyId, props.frequencies);
        }
        return getTimesPerYearFromLastTriggeredAndFrequency(lastTriggered, frequencyId, props.frequencies)
    }

    const calculateTotalIncome = (generator: IncomeGenerator): number => {
        if (props.frequencies.length === 0) {
            return 0;
        }

        const getAmountPerPeriod = (value: number, transactionType: string): number => {
            return transactionType === "Income" ? value : -value;
        }

        return generator.recurringTransactions
            .map(x => getAmountPerPeriod(x.amount, x.transactionType) * getNumberOfTransactions(generator))
            .reduce((sum, x) => sum + x);
    }

    const onAddSourceOfIncomeClick = () => {
        props.push('/income/add');
    }

    const getTotal = (): number => {
        if (props.incomeGenerators.length === 0) {
            return 0;
        }
        return props.incomeGenerators
            .map(x => x.recurringTransactions
                .map(t => getNumberOfTransactions(x) * (t.transactionType === 'Income' ? t.amount : -t.amount)))
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
                    <IncomeGeneratorSummary key={x.id} id={x.id} description={x.description} income={calculateTotalIncome(x)} onClick={(value) => setId(value)} />)
                }
                <div className={calculateTotalClasses()}>${getTotal().toFixed(2)}</div>
                <CustomLink first onClick={() => setMonthly(true)}>{MONTHS[new Date().getMonth()]}</CustomLink>
                <CustomLink onClick={() => setMonthly(false)}>{new Date().getFullYear()}</CustomLink>
            </Content>
            <Content>
                <CustomButton onClick={() => onAddSourceOfIncomeClick()}>Add source of income</CustomButton>
            </Content>
            <IncomeGeneratorModal id={id} generators={props.incomeGenerators} getIncomeGenerators={props.getIncomeGenerators} deleteIncomeGenerator={props.deleteIncomeGenerator} frequencies={props.frequencies} close={() => setId('')} />
        </div>
    )
}

const mapStateToProps = (state: AppDataState): Partial<IncomeGeneratorComponentProps> => {
    return {
        incomeGenerators: state.ledger.incomeGenerators,
        frequencies: state.ledger.frequencies,
    };
}

export default connect(mapStateToProps, { getIncomeGenerators, deleteIncomeGenerator, push })(IncomeGeneratorComponent as any);