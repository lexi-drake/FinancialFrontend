import Frequency from "../../models/Frequency";
import { IncomeGenerator } from "../../models/IncomeGenerator"
import { getTimesPerMonthFromLastTriggeredAndFrequency, getTimesPerYearFromLastTriggeredAndFrequency } from "../../utilities/dates";

interface IncomeGeneratorSummaryProps {
    generator: IncomeGenerator;
    frequencies: Frequency[];
    monthly: boolean;
}

const IncomeGeneratorSummary = (props: IncomeGeneratorSummaryProps) => {

    const getNumberOfTransactions = (): number => {
        if (props.generator.recurringTransactions.length === 0) {
            return 0;
        }
        const lastTriggered: Date = props.generator.recurringTransactions[0].lastTriggered;
        const frequencyId: string = props.generator.recurringTransactions[0].frequencyId;

        if (props.monthly) {
            return getTimesPerMonthFromLastTriggeredAndFrequency(lastTriggered, frequencyId, props.frequencies);
        }
        return getTimesPerYearFromLastTriggeredAndFrequency(lastTriggered, frequencyId, props.frequencies)
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
            <div className="description">{props.generator.description}</div>
            <div className="net">${calculateTotalIncome().toFixed(2)}</div>
            <hr />
        </div>
    )
}

export default IncomeGeneratorSummary;