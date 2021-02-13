interface IncomeGeneratorSummaryProps {
    id: string;
    description: string;
    income: number;
    onClick: (value: string) => void;
}

const IncomeGeneratorSummary = (props: IncomeGeneratorSummaryProps) =>
    <div className="income-generator-summary" onClick={() => props.onClick(props.id)}>
        <div className="description">{props.description}</div>
        <div className="net">${props.income.toFixed(2)}</div>
        <hr />
    </div>

export default IncomeGeneratorSummary;