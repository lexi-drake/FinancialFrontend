import { HorizontalBar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { LedgerEntry } from "../../models/LedgerEntry";

interface LedgerHistoryGraphProps {
    ledgerEntries: LedgerEntry[]
}

const LedgerHistoryGraph = (props: LedgerHistoryGraphProps) => {

    const getData = (type: string): { labels: any, datasets: any } => {
        const getLabelsAndValues = (): [string[], number[]] => {
            const data: Record<string, number> = {};
            for (const entry of props.ledgerEntries) {
                if (entry.transactionType === type) {
                    const key = entry.category;
                    if (data[key]) {
                        // If the key already exists in the record, add the amount
                        // to the existing amount in the record.
                        data[key] += entry.amount;
                    } else {
                        // If the key would be new, set the record to this amount.
                        data[key] = entry.amount;
                    }
                }
            }
            const labels: string[] = [];
            const values: number[] = [];
            for (const key in data) {
                labels.push(key);
                values.push(data[key]);
            }
            return [labels, values];
        }
        const [labels, values] = getLabelsAndValues();
        return {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: (data: { dataset: any, dataIndex: any }) => {
                        if (!data.dataset === undefined || data.dataset.data === undefined || data.dataIndex === undefined) {
                            return '#bdbec2';
                        }
                        const colors: string[] = [
                            '#f5b8b7', '#ba5056', '#8f0e22',    // Reds
                            '#a5d6c6', '#7d957b', '#576970',    // Greens
                            '#2baed3', '#207bad', '#113691'     // Blues
                        ];
                        const value = data.dataset.data[data.dataIndex];
                        const color = colors[value % colors.length];
                        return color;
                    }
                }
            ]
        }
    }

    const options = (title: string): ChartOptions => {
        const options = {
            title: {
                display: true,
                text: title,
                fontSize: 16,
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    },
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            legend: {
                display: false
            },

            responsive: true,
            maintainAspectRatio: false
        }
        return options;
    };

    return (
        <div className="ledger-history-graph">
            <div className="graph-wrapper">
                <HorizontalBar data={getData('Income')} options={options('Income')} />
            </div>
            <div className="graph-wrapper">
                <HorizontalBar data={getData('Expenditure')} options={options('Expenditures')} />
            </div>
        </div>
    );
}

export default LedgerHistoryGraph;