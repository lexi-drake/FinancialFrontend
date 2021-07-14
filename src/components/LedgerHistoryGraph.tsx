import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { LedgerEntry } from "../models/LedgerEntry";
import { useState } from 'react';
import { CHART_COLORS } from '../utilities/constants';
import Selector, { SelectorOption } from './custom/Selector';

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
            const dataList: { label: string, value: number, color: string }[] = [];
            let colorIndex = 0;
            for (const key in data) {
                dataList.push({
                    label: key,
                    value: data[key],
                    color: CHART_COLORS[colorIndex]
                });
                colorIndex = (colorIndex + 11) % CHART_COLORS.length;
            }
            dataList.sort((a, b) => {
                if (a.value > b.value) {
                    return -1;
                }
                if (b.value > a.value) {
                    return 1;
                }
                return 0;
            });
            return [dataList.map(x => x.label), dataList.map(x => x.value), dataList.map(x => x.color)];
        }

        const [labels, values, colors] = getLabelsAndValues();
        return {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 0
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
                fontColor: '#e0e0e0'
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
                display: true,
                labels: {
                    fontColor: '#e0e0e0',
                }
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
            <Selector value={graph} options={options} onChange={(value) => setGraph(value)} />

        </div>
    );
}

export default LedgerHistoryGraph;