import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Utility function to group data by month
const groupDataByMonth = (data: any[]) => {
    const monthlyData: Record<string, { retailSales: number; wholesaleSales: number }> = {};
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    data.forEach((entry) => {
        const [year, month, day] = entry.weekEnding.split('-');
        const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
        const monthIndex = date.getUTCMonth();
        const monthShortName = monthNames[monthIndex]; // Get month short name (e.g., "JAN", "FEB")
        if (!monthlyData[monthShortName]) {
            monthlyData[monthShortName] = { retailSales: 0, wholesaleSales: 0 };
        }

        // Accumulate sales data
        monthlyData[monthShortName].retailSales += entry.retailSales;
        monthlyData[monthShortName].wholesaleSales += entry.wholesaleSales;
    });

    // Define the correct chronological order of months
    const monthsOrder = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    // Sort data by month order and prepare it for rendering
    const sortedMonthlyData = monthsOrder
        .filter((month) => monthlyData[month])
        .map((month) => ({
            month,
            retailSales: monthlyData[month].retailSales,
            wholesaleSales: monthlyData[month].wholesaleSales,
        }));

    return sortedMonthlyData;
};

interface SalesGraphProps {
    data: any[];
}

const SalesGraph: React.FC<SalesGraphProps> = ({ data }) => {
    const monthlyData = groupDataByMonth(data);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid stroke="#f5f5f5" vertical={false} horizontal={false} />

                {/* X-Axis */}
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 14, fill: '#9CA3AF' }}
                    tickLine={false}
                    axisLine={{
                        stroke: '#D1D5DB',
                        strokeWidth: 1,
                    }}
                    interval={0}
                    tickMargin={20}
                />
                <Tooltip formatter={(value: any) => value.toLocaleString()} />

                {/* Retail Sales Line */}
                <Line
                    type="monotone"
                    dataKey="retailSales"
                    stroke="#4A90E2"
                    strokeWidth={3}
                    dot={false}
                />

                {/* Wholesale Sales Line */}
                <Line
                    type="monotone"
                    dataKey="wholesaleSales"
                    stroke="#B0B0B0"
                    strokeWidth={3}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesGraph;
