import { push } from "connected-react-router"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Frequency from "../../models/Frequency"
import { IncomeGenerator } from "../../models/IncomeGenerator"
import TransactionType from "../../models/TransactionType"
import { AppDataState } from "../../store/appdata"
import { getFrequencies, getIncomeGenerators, getTransactionTypes } from "../../store/ledger/actions"
import Content from "../custom/Content"
import CustomButton from "../custom/CustomButton"
import CustomLink from "../custom/CustomLink"
import Section from "../custom/Section"
import IncomeGeneratorSummary from "./IncomeGeneratorSummary"

interface IncomeGeneratorComponentProps {
    incomeGenerators: IncomeGenerator[];
    frequencies: Frequency[];
    transactionTypes: TransactionType[];
    getIncomeGenerators: typeof getIncomeGenerators;
    getFrequencies: typeof getFrequencies;
    getTransactionTypes: typeof getTransactionTypes;
    push: typeof push;
}

const IncomeGeneratorComponent = (props: IncomeGeneratorComponentProps) => {
    const [monthly, setMonthly] = useState(true);

    useEffect(() => {
        const getIncomeGenerators = props.getIncomeGenerators;
        if (props.incomeGenerators.length === 0) {
            getIncomeGenerators();
        }
    }, [props.incomeGenerators, props.getIncomeGenerators]);

    useEffect(() => {
        const getFrequencies = props.getFrequencies;
        if (props.frequencies.length === 0) {
            getFrequencies();
        }
    }, [props.frequencies, props.getFrequencies]);

    useEffect(() => {
        const getTransactionTypes = props.getTransactionTypes;
        if (props.transactionTypes.length === 0) {
            getTransactionTypes();
        }
    }, [props.transactionTypes, props.getTransactionTypes]);

    const onAddSourceOfIncomeClick = () => {
        props.push('/income/add');
    }

    return (
        <div className="income-generator-list">
            <Section>
                <h1>Sources of income</h1>
                <Content>
                    {props.incomeGenerators.map(x =>
                        <IncomeGeneratorSummary key={x.id} generator={x} types={props.transactionTypes} frequencies={props.frequencies} monthly={monthly} />)
                    }
                    <CustomLink first onClick={() => setMonthly(false)}>Yearly</CustomLink>
                    <CustomLink onClick={() => setMonthly(true)}>Monthly</CustomLink>
                </Content>
                <Content>
                    <CustomButton onClick={() => onAddSourceOfIncomeClick()}>Add source of income</CustomButton>
                </Content>
            </Section>
        </div>
    )
}

const mapStateToProps = (state: AppDataState): Partial<IncomeGeneratorComponentProps> => {
    return {
        incomeGenerators: state.ledger.incomeGenerators,
        frequencies: state.ledger.frequencies,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getIncomeGenerators, getFrequencies, getTransactionTypes, push })(IncomeGeneratorComponent as any);