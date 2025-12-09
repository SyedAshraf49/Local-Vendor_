import React, { useMemo } from 'react';
import { usePreOrder } from '../../context/PreOrderContext';
import { useTranslations } from '../../hooks/useTranslations';
import { BookOpenIcon } from '../common/Icons';

const PreOrderManagement: React.FC = () => {
    const { preOrderItems } = usePreOrder();
    const t = useTranslations();

    const groupedItems = useMemo(() => {
        return preOrderItems.reduce<Record<string, number>>((acc, item) => {
            acc[item.productName] = (acc[item.productName] || 0) + 1;
            return acc;
        }, {});
    }, [preOrderItems]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.vendorPreOrders}</h3>
                <BookOpenIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="overflow-x-auto max-h-[32rem] overflow-y-auto">
                {Object.keys(groupedItems).length > 0 ? (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t.product}</th>
                                <th scope="col" className="px-6 py-3 text-center"># of Requests</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* FIX: Refactored to use Object.keys() for robust sorting and rendering, avoiding type inference issues with Object.entries(). */}
                            {Object.keys(groupedItems).sort((a, b) => groupedItems[b] - groupedItems[a]).map((productName) => (
                                <tr key={productName} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{productName}</th>
                                    <td className="px-6 py-4 text-center font-bold text-lg text-gray-800 dark:text-gray-200">{groupedItems[productName]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t.emptyPreOrderList}</p>
                )}
            </div>
        </div>
    );
};

export default PreOrderManagement;