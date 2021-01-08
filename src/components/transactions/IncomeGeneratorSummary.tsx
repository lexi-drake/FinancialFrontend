import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator"
import TransactionType from "../../models/TransactionType"

interface IncomeGeneratorSummaryProps {
    generator: IncomeGenerator;
    frequencies: Frequency[];
    types: TransactionType[];
    monthly: boolean;
}

const IncomeGeneratorSummary = (props: IncomeGeneratorSummaryProps) => {

    const getNumberOfTransactions = (): number => {
        // TODO (alexa): actually calculate this value using tick-dates
        const perAnnum: number = props.frequencies.filter(x => x.id === props.generator.frequencyId)[0].approxTimesPerYear;
        return props.monthly ? perAnnum / 21 : perAnnum;
    }

    const calculateTotalIncome = (): number => {
        if (props.types.length === 0 || props.frequencies.length === 0) {
            return 0;
        }

        const getAmountPerPeriod = (value: number, typeId: string): number => {
            const type = props.types.filter(x => x.id === typeId)[0];
            return type.description === "Income" ? value : -value;
        }

        return props.generator.recurringTransactions
            .map(x => getAmountPerPeriod(x.amount, x.transactionTypeId) * getNumberOfTransactions())
            .reduce((sum, x) => sum + x);
    }

    return (
        <div className="income-generator-summary">
            <span className="description">{props.generator.description}</span>
            <span className="net">${calculateTotalIncome().toFixed(2)}</span>
            <hr />
        </div>
    )
}

export default IncomeGeneratorSummary;