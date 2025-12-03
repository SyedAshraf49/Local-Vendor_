
import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

interface ThankYouModalProps {
    onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ onClose }) => {
    const t = useTranslations();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm text-center animate-scale-in">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold my-4 text-gray-900 dark:text-white">{t.thankYouOrder}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t.orderPlacedSuccess}</p>
                <button onClick={onClose} className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                    {t.close}
                </button>
            </div>
        </div>
    );
};

export default ThankYouModal;