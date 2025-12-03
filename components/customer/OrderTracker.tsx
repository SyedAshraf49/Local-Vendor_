import React, { useEffect, useMemo } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslations } from '../../hooks/useTranslations';
import { type Order, type OrderStatus } from '../../types';
import { getDistance } from '../../lib/helpers';
import { ClipboardListIcon, FireIcon, TruckIcon, CheckCircleIcon } from '../common/Icons';

const OrderTracker: React.FC = () => {
    const { orders, updateOrderStatus } = useOrders();
    const { user } = useAuth();
    const t = useTranslations();

    const customerOrders = useMemo(() => orders.filter(o => o.customerName === user?.name), [orders, user]);

    useEffect(() => {
        const intervals = customerOrders.map(order => {
            if (order.status !== 'Delivered') {
                return setInterval(() => {
                    const statuses: OrderStatus[] = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
                    const currentIndex = statuses.indexOf(order.status);
                    if (currentIndex < statuses.length - 1) {
                        const nextStatus = statuses[currentIndex + 1];
                        updateOrderStatus(order.id, nextStatus);
                    }
                }, 15000); // Update status every 15 seconds
            }
            return null;
        });

        return () => intervals.forEach(interval => interval && clearInterval(interval));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerOrders, updateOrderStatus]);

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'Order Placed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'Preparing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'Out for Delivery': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    }
    
    const statuses: OrderStatus[] = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    const statusIcons: Record<OrderStatus, React.FC<{className?: string}>> = {
        'Order Placed': ClipboardListIcon,
        'Preparing': FireIcon,
        'Out for Delivery': TruckIcon,
        'Delivered': CheckCircleIcon
    };

    const statusTranslationKeys: Record<OrderStatus, keyof typeof t> = {
        'Order Placed': 'orderPlaced',
        'Preparing': 'preparing',
        'Out for Delivery': 'outForDelivery',
        'Delivered': 'delivered'
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <ClipboardListIcon className="h-7 w-7 text-indigo-500" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.myOrders}</h3>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {customerOrders.length > 0 ? customerOrders.map(order => {
                    const currentIndex = statuses.indexOf(order.status);
                    return (
                        <div key={order.id} className="p-4 border dark:border-gray-600 rounded-lg">
                            <div className="flex justify-between items-start">
                                 <div>
                                    <p className="font-semibold text-gray-700 dark:text-gray-300">{t.orderId}: <span className="font-mono text-xs">{order.id}</span></p>
                                    {order.customerLocation && <p className="text-sm text-gray-500 dark:text-gray-400">{t.distance}: {getDistance(order.customerLocation, order.vendorLocation)} {t.kmAway}</p>}
                                </div>
                                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {t[statusTranslationKeys[order.status]]}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center">
                                {statuses.map((status, index) => {
                                    const isCompleted = index < currentIndex;
                                    const isActive = index === currentIndex;
                                    const Icon = statusIcons[status];
                                    
                                    return (
                                        <React.Fragment key={status}>
                                            <div className="flex flex-col items-center text-center">
                                                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isActive || isCompleted ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                            </div>
                                            {index < statuses.length - 1 && (
                                                <div className={`flex-1 h-1 transition-colors mx-1 sm:mx-2 ${isCompleted ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                            <div className="mt-2 flex justify-between">
                                {statuses.map((status) => (
                                    <p key={status} className="text-xs text-gray-500 dark:text-gray-400 w-1/4 text-center">{t[statusTranslationKeys[status]]}</p>
                                ))}
                            </div>
                        </div>
                    )
                }) : (
                    <p className="text-gray-500 dark:text-gray-400">You haven't placed any orders yet.</p>
                )}
            </div>
        </div>
    );
};

export default OrderTracker;