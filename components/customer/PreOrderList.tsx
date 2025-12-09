import React from 'react';
import { usePreOrder } from '../../context/PreOrderContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslations } from '../../hooks/useTranslations';
import { BookOpenIcon, TrashIcon } from '../common/Icons';

const PreOrderList: React.FC = () => {
    const { preOrderItems, removePreOrderItem } = usePreOrder();
    const { user } = useAuth();
    const t = useTranslations();

    const myPreOrders = user ? preOrderItems.filter(item => item.customerName === user.name) : [];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <BookOpenIcon className="h-7 w-7 text-indigo-500" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.preOrderList}</h3>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
                {myPreOrders.length > 0 ? (
                    myPreOrders.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                            <span className="text-gray-800 dark:text-gray-200">{item.productName}</span>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => user && removePreOrderItem(item.productId, user.name)}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    aria-label={`Remove ${item.productName}`}
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">{t.emptyPreOrderList}</p>
                )}
            </div>
        </div>
    );
};

export default PreOrderList;
