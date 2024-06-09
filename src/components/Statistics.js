import React, { useMemo } from 'react';


const Statistics = ({ data, isLoading }) => {
    const statistics = useMemo(() => {
        const totalSales = data?.reduce((acc, item) => acc + item.sales, 0);
        const totalRevenue = data?.reduce((acc, item) => acc + item.revenue, 0);

        const uniqueProducts = [...new Set(data?.map(item => item.product))];
        const averageSalesPerProduct = (totalSales / uniqueProducts.length).toFixed(2);
        const averageRevenuePerProduct = (totalRevenue / uniqueProducts.length).toFixed(2);

        // best seller
        const productSales = data.reduce((acc, item) => {
            if (!acc[item.product]) {
                acc[item.product] = { product: item.product, totalSales: 0 };
            }
            acc[item.product].totalSales += item.sales;
            return acc;
        }, {});

        const aggregatedSalesArray = Object.values(productSales);

        const bestSeller = aggregatedSalesArray.reduce((max, product) => {
            return product.totalSales > max.totalSales ? product : max;
        }, { totalSales: 0 });

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
            salesByDate,
            bestSeller
        };
    }, [data]);

    return (
        <div className="rounded-lg bg-gray-50 p-4 leading-normal flex flex-col justify-center">
            {isLoading && <div className="text-center">Loading...</div>}

            {!isLoading && (
                <>
                    <h2 className='underline underline-offset-4 font-bold'>Sales Statistics</h2>
                    <p>Total Sales: {statistics?.totalSales}</p>
                    <p>Total Revenue: {statistics?.totalRevenue}</p>
                    <p>Average Sales per Product: {statistics?.averageSalesPerProduct}</p>
                    <p>Average Revenue per Product: {statistics?.averageRevenuePerProduct}</p>
                    <p>Best Seller: {statistics?.bestSeller?.product} - Total Sales: {statistics?.bestSeller?.totalSales}</p>

                    <h3 className='underline underline-offset-4 font-bold mt-5'>Sales by Date</h3>
                    <ul>
                        {Object.entries(statistics?.salesByDate).map(([date, data]) => (
                            <li key={date}>
                                Date: {date} - Sales: {data.sales}, Revenue: {data.revenue}
                            </li>
                        ))}
                    </ul>
                </>
            )}

        </div>
    );
};

export default Statistics;
