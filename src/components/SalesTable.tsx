import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface SalesData {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
}

interface SalesTableProps {
    data: SalesData[];
}

// Helper function to format the date (MM-DD-YYYY format)
const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    const formattedMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getUTCDate().toString().padStart(2, '0');
    const formattedYear = date.getUTCFullYear();
    return `${formattedMonth}-${formattedDay}-${formattedYear}`;
};

const SalesTable: React.FC<SalesTableProps> = ({ data }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof SalesData; direction: 'asc' | 'desc' } | null>(null);

    // Sorting logic for the table data
    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        return 0;
    });

    // Function to toggle sorting
    const requestSort = (key: keyof SalesData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <table className="w-full border-collapse">
            <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-300">
                <th className="px-4 py-4 text-left font-normal">
                    <div className="flex items-center">
                        Week Ending
                        <button
                            className="ml-1 text-gray-500 text-xs"
                            onClick={() => requestSort('weekEnding')}
                        >
                            {sortConfig?.key === 'weekEnding' && sortConfig.direction === 'asc'
                                ? <FontAwesomeIcon icon={faChevronUp} />
                                : <FontAwesomeIcon icon={faChevronDown} />
                            }
                        </button>
                    </div>
                </th>
                <th className="px-4 py-4 text-right font-normal">
                    <div className="flex items-center">
                        Retail Sales
                        <button
                            className="ml-1 text-gray-500 text-xs"
                            onClick={() => requestSort('retailSales')}
                        >
                            {sortConfig?.key === 'retailSales' && sortConfig.direction === 'asc'
                                ? <FontAwesomeIcon icon={faChevronUp} />
                                : <FontAwesomeIcon icon={faChevronDown} />
                            }
                        </button>
                    </div>
                </th>
                <th className="px-4 py-4 text-right font-normal">
                    <div className="flex items-center">
                        Wholesale Sales
                        <button
                            className="ml-1 text-gray-500 text-xs"
                            onClick={() => requestSort('wholesaleSales')}
                        >
                            {sortConfig?.key === 'wholesaleSales' && sortConfig.direction === 'asc'
                                ? <FontAwesomeIcon icon={faChevronUp} />
                                : <FontAwesomeIcon icon={faChevronDown} />
                            }
                        </button>
                    </div>
                </th>
                <th className="px-4 py-4 text-right font-normal">
                    <div className="flex items-center">
                        Units Sold
                        <button
                            className="ml-1 text-gray-500 text-xs"
                            onClick={() => requestSort('unitsSold')}
                        >
                            {sortConfig?.key === 'unitsSold' && sortConfig.direction === 'asc'
                                ? <FontAwesomeIcon icon={faChevronUp} />
                                : <FontAwesomeIcon icon={faChevronDown} />
                            }
                        </button>
                    </div>
                </th>
                <th className="px-4 py-4 text-right font-normal">
                    <div className="flex items-center">
                        Retailer Margin
                        <button
                            className="ml-1 text-gray-500 text-xs"
                            onClick={() => requestSort('retailerMargin')}
                        >
                            {sortConfig?.key === 'retailerMargin' && sortConfig.direction === 'asc'
                                ? <FontAwesomeIcon icon={faChevronUp} />
                                : <FontAwesomeIcon icon={faChevronDown} />
                            }
                        </button>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            {sortedData.map((row, index) => (
                <tr key={index} className="border-b border-gray-300">
                    <td className="pl-4 pr-4 py-2 text-sm text-gray-400 text-left"> {formatDate(row.weekEnding)}
                    </td>
                    <td className="pl-4 pr-4 py-2 text-sm text-gray-400 text-left">
                        ${row.retailSales.toLocaleString()}
                    </td>
                    <td className="pl-4 pr-4 py-2 text-sm text-gray-400 text-left">
                        ${row.wholesaleSales.toLocaleString()}
                    </td>
                    <td className="pl-4 pr-4 py-2 text-sm text-gray-400 text-left">{row.unitsSold}</td>
                    <td className="pl-4 pr-4 py-2 text-sm text-gray-400 text-left">
                        ${row.retailerMargin.toLocaleString()}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default SalesTable;
