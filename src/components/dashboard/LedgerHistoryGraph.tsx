import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { LedgerEntry } from "../../models/LedgerEntry";
import { useState } from 'react';
import Content from '../custom/Content';
import CustomLink from '../custom/CustomLink';
import { CHART_COLORS } from '../../utilities/constants';

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
                colors.push(CHART_COLORS[colorIndex % CHART_COLORS.length]);
                colorIndex += 7;
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
            maintainAspectRatio: false
        }
        return options;
    };

    const getGraph = (): any => {
        if (graph === 'Income') {
            return <Pie data={getData('Income')} options={options('Income')} />
        }
        return <Pie data={getData('Expenditure')} options={options('Expenditures')} />
    }

    return (
        <div className="ledger-history-graph">
            {getGraph()}
            <Content>
                <CustomLink onClick={() => setGraph('Income')}>Income</CustomLink>
                <CustomLink onClick={() => setGraph('Expenditures')}>Expenditures</CustomLink>
            </Content>
        </div>
    );
}

export default LedgerHistoryGraph;