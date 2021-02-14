import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { LedgerEntry } from "../../models/LedgerEntry";
import { useState } from 'react';
import Content from '../custom/Content';
import { CHART_COLORS } from '../../utilities/constants';
import Selector, { SelectorOption } from '../custom/Selector';

interface LedgerHistoryGraphProps {
    ledgerEntries: LedgerEntry[]
}

const LedgerHistoryGraph = (props: LedgerHistoryGraphProps) => {
    const [graph, setGraph] = useState('Expenditures');

    const getData = (type: string): { labels: any, datasets: any } => {
        const getLabelsAndValues = (): [string[], number[], string[]] => {
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
            const colors: string[] = [];
            let colorIndex = 0;
            for (const key in data) {
                labels.push(key);
                values.push(data[key]);
                colors.push(CHART_COLORS[colorIndex]);
                colorIndex = (colorIndex + 7) % CHART_COLORS.length;
            }
            return [labels, values, colors];
        }
        const [labels, values, colors] = getLabelsAndValues();
        return {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: colors
                }
            ]
        }
    }

    const graphOptions = (title: string): ChartOptions => (
        {
            title: {
                display: true,
                text: title,
                fontSize: 16,
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            display: false
                        }
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            legend: {
                display: true
            },
            responsive: true,
            maintainAspectRatio: true
        });

    const getGraph = (): any => {
        if (graph === 'Income') {
            return <Pie width={300} height={300} data={getData('Income')} options={graphOptions('Income')} />
        }
        return <Pie width={300} height={300} data={getData('Expenditure')} options={graphOptions('Expenditures')} />
    }

    const options: SelectorOption[] = [
        { value: 'Income', description: 'Income' },
        { value: 'Expenditures', description: 'Expenditures' }
    ];

    return (
        <div className="ledger-history-graph">
            {getGraph()}
            <Content>
                <Selector value={graph} options={options} onChange={(value) => setGraph(value)} />
            </Content>
        </div>
    );
}

export default LedgerHistoryGraph;