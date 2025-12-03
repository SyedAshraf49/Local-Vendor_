import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';
import { useTranslations } from '../../hooks/useTranslations';
import { type Product, type Order } from '../../types';
import OrderDetailModal from './OrderDetailModal';
import ProductEditModal from './ProductEditModal';
import PreOrderManagement from './PreOrderManagement';
import { EditIcon, TrashIcon } from '../common/Icons';
import EarningsReport from './EarningsReport';

const MOCK_INVENTORY_DATA: Product[] = [
    { id: 1, name: 'Tomato', category: 'vegetables', price: 50, unit: 'kg', unitIncrement: 0.25, expiryDate: '2024-12-20', stock: 100, rating: { average: 4.5, count: 120 }, location: 'royapuram' },
    { id: 2, name: 'Milk', category: 'dairy', price: 60, unit: 'L', unitIncrement: 0.5, expiryDate: '2024-09-10', stock: 50, rating: { average: 4.8, count: 250 }, location: 't.nagar' },
    { id: 3, name: 'The Hindu Newspaper', category: 'newspapers', price: 5, unit: 'pcs', unitIncrement: 1, expiryDate: '2024-08-16', stock: 200, rating: { average: 4.2, count: 80 }, location: 'ashok nagar' },
    { id: 4, name: 'Dark Chocolate (100g)', category: 'chocolates', price: 150, unit: 'pcs', unitIncrement: 1, expiryDate: '2025-06-01', stock: 80, rating: { average: 4.9, count: 310 }, location: 'saidapetu' },
    { id: 5, name: 'Apple', category: 'fruits', price: 120, unit: 'kg', unitIncrement: 0.25, expiryDate: '2024-09-25', stock: 120, rating: { average: 4.6, count: 180 }, location: 'royapuram' },
];

const VendorDashboard: React.FC = () => {
    const { user } = useAuth();
    const { orders } = useOrders();
    const t = useTranslations();
    const { addToast } = useToast();
    const [inventory, setInventory] = useState(MOCK_INVENTORY_DATA);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isProductModalOpen, setProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const lastOrderTimestamp = useMemo(() => orders[0]?.timestamp, [orders]);

    useEffect(() => {
        if (lastOrderTimestamp) {
            const latestOrder = orders[0];
            if ((Date.now() - latestOrder.timestamp.getTime()) < 5000) {
                 addToast(`${t.newOrderReceived} - ${latestOrder.customerName}`, 'success');
            }
        }
    }, [lastOrderTimestamp, orders, addToast, t.newOrderReceived, t.sold]);

    const handleOpenEditModal = (product: Product) => {
        setEditingProduct(product);
        setProductModalOpen(true);
    };

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setProductModalOpen(true);
    };

    const handleDeleteProduct = (productId: number) => {
        setInventory(prev => prev.filter(item => item.id !== productId));
        addToast(t.productDeleted, 'success');
    };

    const handleSaveProduct = (product: Product) => {
        if (editingProduct) { // Update existing
            setInventory(prev => prev.map(p => p.id === product.id ? product : p));
            addToast(t.productUpdated, 'success');
        } else { // Add new
            const newProduct = { ...product, id: Date.now() }; // Assign a new ID
            setInventory(prev => [newProduct, ...prev]);
            addToast(t.productAdded, 'success');
        }
        setProductModalOpen(false);
        setEditingProduct(null);
    };


    return (
        <div className="container mx-auto animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">{t.welcome}, {user?.name}!</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Incoming Orders */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.incomingOrders}</h3>
                     <div className="space-y-4 max-h-[32rem] overflow-y-auto">
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id} className="p-4 border dark:border-gray-600 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-700 dark:text-gray-300">Order #{order.id.slice(-6)}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.customerName}</p>
                                        </div>
                                        <button onClick={() => setSelectedOrder(order)} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                            {t.viewDetails}
                                        </button>
                                    </div>
                                    <p className="text-right font-bold mt-2 text-indigo-600 dark:text-indigo-400">Total: ₹{order.total.toFixed(2)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No new orders yet.</p>
                        )}
                    </div>
                </div>

                {/* Inventory */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.inventory}</h3>
                        <button onClick={handleOpenAddModal} className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700">
                            {t.addProduct}
                        </button>
                    </div>
                    <div className="overflow-x-auto max-h-[32rem] overflow-y-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t.product}</th>
                                    <th scope="col" className="px-6 py-3">{t.location}</th>
                                    <th scope="col" className="px-6 py-3">{t.stock}</th>
                                    <th scope="col" className="px-6 py-3">{t.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                                        <td className="px-6 py-4 capitalize">{item.location}</td>
                                        <td className="px-6 py-4">{item.stock}</td>
                                        <td className="px-6 py-4 flex items-center space-x-2">
                                            <button onClick={() => handleOpenEditModal(item)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" title={t.editProduct}>
                                                <EditIcon className="h-5 w-5"/>
                                            </button>
                                            <button onClick={() => handleDeleteProduct(item.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" title={t.deleteProduct}>
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <PreOrderManagement />
                </div>

                <div className="md:col-span-2">
                    <EarningsReport />
                </div>
            </div>
            {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            {isProductModalOpen && <ProductEditModal product={editingProduct} onSave={handleSaveProduct} onClose={() => setProductModalOpen(false)} />}
        </div>
    );
};

export default VendorDashboard;