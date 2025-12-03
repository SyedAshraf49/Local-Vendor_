import React, { useMemo } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useTranslations } from '../../hooks/useTranslations';
import { ChartBarIcon, PrintIcon } from '../common/Icons';
import { Product } from '../../types';

interface ProductSales {
    name: string;
    quantity: number;
    revenue: number;
    unit: Product['unit'];
}

interface ReportData {
    totalRevenue: number;
    salesByProduct: ProductSales[];
    salesOverTime: Record<string, number>;
}

const EarningsReport: React.FC = () => {
    const { orders } = useOrders();
    const t = useTranslations();

    const reportData = useMemo((): ReportData => {
        if (orders.length === 0) {
            return { totalRevenue: 0, salesByProduct: [], salesOverTime: {} };
        }

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        const productSalesMap = new Map<number, ProductSales>();
        const salesOverTimeMap = new Map<string, number>();

        for (const order of orders) {
            const date = order.timestamp.toISOString().split('T')[0];
            salesOverTimeMap.set(date, (salesOverTimeMap.get(date) || 0) + order.total);

            for (const item of order.items) {
                const existing = productSalesMap.get(item.id);
                const itemRevenue = (item.offer ? item.offer.newPrice : item.price) * item.quantity;
                if (existing) {
                    existing.quantity += item.quantity;
                    existing.revenue += itemRevenue;
                } else {
                    productSalesMap.set(item.id, {
                        name: item.name,
                        quantity: item.quantity,
                        revenue: itemRevenue,
                        unit: item.unit,
                    });
                }
            }
        }

        const salesByProduct = Array.from(productSalesMap.values()).sort((a, b) => b.revenue - a.revenue);
        const salesOverTime: Record<string, number> = Object.fromEntries(salesOverTimeMap.entries());

        return { totalRevenue, salesByProduct, salesOverTime };
    }, [orders]);

    const { totalRevenue, salesByProduct, salesOverTime } = reportData;

    const maxDailySale = useMemo(() => {
        const values = Object.values(salesOverTime);
        // FIX: The `values` array was being inferred as `unknown[]`, causing a type error.
        // Casting the array to `number[]` ensures type safety for the `Math.max` function.
        return values.length > 0 ? Math.max(...(values as number[])) : 0;
    }, [salesOverTime]);

    if (orders.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md printable-area">
                <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <ChartBarIcon className="h-7 w-7 text-indigo-500" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.earningsReport}</h3>
                    </div>
                     <button
                        onClick={() => window.print()}
                        className="non-printable p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        title="Print Report"
                    >
                        <PrintIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">{t.noSalesData}</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md printable-area">
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <ChartBarIcon className="h-7 w-7 text-indigo-500" />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.earningsReport}</h3>
                </div>
                <button
                    onClick={() => window.print()}
                    className="non-printable p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Print Report"
                >
                    <PrintIcon className="h-6 w-6" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Metrics & Top Products */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Total Revenue */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg text-center">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.totalRevenue}</p>
                        <p className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-2">₹{totalRevenue.toFixed(2)}</p>
                    </div>

                    {/* Sales by Product */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">{t.salesByProduct}</h4>
                        <div className="overflow-x-auto max-h-96 overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                    <tr>
                                        <th scope="col" className="px-4 py-2">{t.product}</th>
                                        <th scope="col" className="px-4 py-2 text-center">{t.quantitySold}</th>
                                        <th scope="col" className="px-4 py-2 text-right">{t.revenue}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesByProduct.map(product => (
                                        <tr key={product.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</th>
                                            <td className="px-4 py-2 text-center">{`${product.quantity.toFixed(product.unit === 'pcs' ? 0 : 2)} ${product.unit}`}</td>
                                            <td className="px-4 py-2 text-right">₹{product.revenue.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sales over time chart */}
                <div className="lg:col-span-2">
                     <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">{t.salesOverTime}</h4>
                     <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg h-[26rem] flex items-end justify-around gap-2">
                        {Object.keys(salesOverTime).sort((dateA, dateB) => new Date(dateA).getTime() - new Date(dateB).getTime()).map((date) => {
                            const amount = salesOverTime[date];
                            return (
                                <div key={date} className="flex-1 flex flex-col items-center group" style={{ minWidth: '20px' }}>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 invisible group-hover:visible">₹{amount.toFixed(0)}</div>
                                    <div 
                                        className="w-full bg-indigo-400 dark:bg-indigo-500 rounded-t-md hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all"
                                        style={{ height: `${(amount / maxDailySale) * 100}%` }}
                                        title={`Date: ${date}\nSales: ₹${amount.toFixed(2)}`}
                                    />
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 whitespace-nowrap">
                                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                            );
                        })}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default EarningsReport;