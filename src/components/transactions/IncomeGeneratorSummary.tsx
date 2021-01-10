import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator"

interface IncomeGeneratorSummaryProps {
    generator: IncomeGenerator;
    frequencies: Frequency[];
    monthly: boolean;
}

const IncomeGeneratorSummary = (props: IncomeGeneratorSummaryProps) => {

    const getNumberOfTransactions = (): number => {
        // TODO (alexa): actually calculate this value using tick-dates
        const perAnnum: number = props.frequencies.filter(x => x.id === props.generator.frequencyId)[0].approxTimesPerYear;
        return props.monthly ? perAnnum / 21 : perAnnum;
    }

    const calculateTotalIncome = (): number => {
        if (props.frequencies.length === 0) {
            return 0;
        }

        const getAmountPerPeriod = (value: number, transactionType: string): number => {
            return transactionType === "Income" ? value : -value;
        }

        return props.generator.recurringTransactions
            .map(x => getAmountPerPeriod(x.amount, x.transactionType) * getNumberOfTransactions())
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