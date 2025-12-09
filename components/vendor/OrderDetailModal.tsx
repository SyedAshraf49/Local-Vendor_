import React from 'react';
import { type Order } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  const t = useTranslations();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.customerAddress)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh] animate-scale-in">
        <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t.orderDetails} - #{order.id.slice(-6)}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-2xl">&times;</button>
        </header>

        <main className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">{t.customerInformation}</h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
              <p><strong>{t.fullName}:</strong> {order.customerName}</p>
              <p><strong>{t.address}:</strong> {order.customerAddress}</p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-block">{t.openInMaps}</a>
            </div>
          </div>

          {/* Items Ordered */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">{t.itemsOrdered}</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-600 border-t border-b dark:border-gray-600">
              {order.items.map(item => (
                <li key={item.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity.toFixed(item.unit === 'pcs' ? 0 : 2)} {item.unit}</p>
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">₹{(item.offer ? item.offer.newPrice : item.price).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Total */}
          <div className="flex justify-end items-center text-xl font-bold text-gray-800 dark:text-gray-100">
            <span>{t.total}: &nbsp;</span>
            <span className="text-indigo-600 dark:text-indigo-400">₹{order.total.toFixed(2)}</span>
          </div>

        </main>

        <footer className="p-4 border-t dark:border-gray-700 text-right">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {t.close}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default OrderDetailModal;