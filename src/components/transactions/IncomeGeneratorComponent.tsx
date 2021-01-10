import { push } from "connected-react-router"
import { useState } from "react"
import { connect } from "react-redux"
import Frequency from "../../models/Frequency"
import { IncomeGenerator } from "../../models/IncomeGenerator"
import { AppDataState } from "../../store/appdata"
import { getFrequencies, getIncomeGenerators } from "../../store/ledger/actions"
import { MONTHS } from "../../utilities/constants"
import { UsesFrequencies, UsesIncomeGenerators } from "../../utilities/hooks"
import Content from "../custom/Content"
import CustomButton from "../custom/CustomButton"
import CustomLink from "../custom/CustomLink"
import Section from "../custom/Section"
import IncomeGeneratorSummary from "./IncomeGeneratorSummary"

interface IncomeGeneratorComponentProps {
    incomeGenerators: IncomeGenerator[];
    frequencies: Frequency[];
    getIncomeGenerators: typeof getIncomeGenerators;
    getFrequencies: typeof getFrequencies;
    push: typeof push;
}

const IncomeGeneratorComponent = (props: IncomeGeneratorComponentProps) => {
    const [monthly, setMonthly] = useState(true);

    UsesIncomeGenerators(props.incomeGenerators, props.getIncomeGenerators);
    UsesFrequencies(props.frequencies, props.getFrequencies);

    const onAddSourceOfIncomeClick = () => {
        props.push('/income/add');
    }

    return (
        <div className="income-generator-list">
            <h1>Sources of income</h1>
            <Content>
                {props.incomeGenerators.map(x =>
                    <IncomeGeneratorSummary key={x.id} generator={x} frequencies={props.frequencies} monthly={monthly} />)
                }
                <CustomLink first onClick={() => setMonthly(true)}>{MONTHS[new Date().getMonth()]}</CustomLink>
                <CustomLink onClick={() => setMonthly(false)}>{new Date().getFullYear()}</CustomLink>
            </Content>
            <Content>
                <CustomButton onClick={() => onAddSourceOfIncomeClick()}>Add source of income</CustomButton>
            </Content>
        </div>
    )
}

const mapStateToProps = (state: AppDataState): Partial<IncomeGeneratorComponentProps> => {
    return {
        incomeGenerators: state.ledger.incomeGenerators,
        frequencies: state.ledger.frequencies,
    };
}

export default connect(mapStateToProps, { getIncomeGenerators, getFrequencies, push })(IncomeGeneratorComponent as any);