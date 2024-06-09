import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDayOfWeek } from '../utils/date';
import { groupingArray, groupingDate } from '../utils/grouping';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Daily sales trends',
        },
    },
};

const SalesChart = ({ dataSales = [], isLoading }) => {
    const newDataSales = groupingArray(dataSales)
    const newDate = groupingDate(dataSales)

    const data = {
        labels: newDate.map(data => `${data.date} - (${getDayOfWeek(data.date)})`),
        datasets: newDataSales?.map((data) => {
            return {
                label: data[0].product,
                data: data.map(item => item.sales),
                backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            }
        }),
    };

    return (
        <div className='flex justify-center'>
            {isLoading && <div className="text-center">Loading...</div>}

            {!isLoading && <Bar data={data} options={options} />}
        </div>
    )
}

export default SalesChart