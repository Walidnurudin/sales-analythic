import React, { useMemo } from 'react';


const Statistics = ({ data }) => {
    const statistics = useMemo(() => {
        const totalSales = data?.reduce((acc, item) => acc + item.sales, 0);
        const totalRevenue = data?.reduce((acc, item) => acc + item.revenue, 0);

        const uniqueProducts = [...new Set(data?.map(item => item.product))];
        const averageSalesPerProduct = (totalSales / uniqueProducts.length)
        const averageRevenuePerProduct = (totalRevenue / uniqueProducts.length)

        const salesByDate = data?.reduce((acc, item) => {
            const date = item.date;
            if (!acc[date]) {
                acc[date] = { sales: 0, revenue: 0 };
            }
            acc[date].sales += item.sales;
            acc[date].revenue += item.revenue;
            return acc;
        }, {});

        return {
            totalSales,
            totalRevenue,
            averageSalesPerProduct,
            averageRevenuePerProduct,
            salesByDate
        };
    }, [data]);

    return (
        <div>
            <h2>Sales Statistics</h2>
            <p>Total Sales: {statistics.totalSales}</p>
            <p>Total Revenue: ${statistics.totalRevenue}</p>
            <p>Average Sales per Product: {statistics.averageSalesPerProduct}</p>
            <p>Average Revenue per Product: ${statistics.averageRevenuePerProduct}</p>
            <h3>Sales by Date</h3>
            <ul>
                {Object.entries(statistics.salesByDate).map(([date, data]) => (
                    <li key={date}>
                        Date: {date} - Sales: {data.sales}, Revenue: ${data.revenue}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Statistics;
