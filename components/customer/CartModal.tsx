import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useTranslations } from '../../hooks/useTranslations';
import { TrashIcon } from '../common/Icons';
import CheckoutModal from './CheckoutModal';
import ProductIcon from './ProductIcon';

interface CartModalProps {
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const t = useTranslations();
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);

    const handleCheckout = () => {
        setCheckoutOpen(true);
    };

    if (isCheckoutOpen) {
        return <CheckoutModal onClose={() => { setCheckoutOpen(false); onClose(); }} />;
    }

    return (
        <div className="fixed inset-0 z-40" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity animate-fade-in" onClick={onClose}></div>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white" id="slide-over-title">
                                    {t.cart}
                                </h2>
                                <div className="ml-3 h-7 flex items-center">
                                    <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onClose}>
                                        <span className="sr-only">Close panel</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    {cartItems.length > 0 ? (
                                        <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                            {cartItems.map((item) => (
                                                <li key={item.id} className="py-6 flex">
                                                     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                                        <ProductIcon category={item.category} containerClassName="h-full w-full" className="h-12 w-12" />
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                                <h3>{item.name}</h3>
                                                                <p className="ml-4">₹{(item.offer ? item.offer.newPrice : item.price).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 flex items-end justify-between text-sm">
                                                            <p className="text-gray-500 dark:text-gray-400">Qty: {item.quantity.toFixed(item.unit === 'pcs' ? 0 : 2)} {item.unit}</p>

                                                            <div className="flex">
                                                                <button onClick={() => removeFromCart(item.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                                    <TrashIcon className="h-5 w-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-gray-500 dark:text-gray-400">{t.emptyCart}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 py-6 px-4 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <p>{t.total}</p>
                                    <p>₹{cartTotal.toFixed(2)}</p>
                                </div>
                                <div className="mt-6">
                                    <button onClick={handleCheckout} className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                        {t.checkout}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;