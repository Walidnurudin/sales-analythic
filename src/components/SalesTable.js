import React from 'react'

const SalesTable = ({ data = [], isLoading = false }) => {
    return (
        <div className="rounded-lg bg-gray-100 p-4 leading-normal">
            <table className="border-collapse">
                <thead>
                    <tr>
                        <th className="w-40 min-w-[10rem] max-w-[10rem] leading-normal">Product</th>
                        <th className="w-40 min-w-[10rem] max-w-[10rem] leading-normal">Date</th>
                        <th className="w-40 min-w-[10rem] max-w-[10rem] leading-normal">Sales</th>
                        <th className="w-40 min-w-[10rem] max-w-[10rem] leading-normal">Income</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td colSpan="5" classNameName="text-center">Loading...</td></tr>}

                    {!isLoading && data.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-emerald-200 p-2">{item.product}</td>
                            <td className="border border-emerald-200 p-2">{item.date}</td>
                            <td className="border border-emerald-200 p-2">{item.sales}</td>
                            <td className="border border-emerald-200 p-2">{item.revenue}</td>
                        </tr>
                    ))}

                    {!isLoading && data.length === 0 && <tr><td colSpan="4" className="text-center">No data</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default SalesTable