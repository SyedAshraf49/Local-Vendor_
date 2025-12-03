import React from 'react';
import { useToast } from '../../context/ToastContext';
import { type Toast } from '../../context/ToastContext';

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  const getIcon = (type: 'success' | 'error') => {
    if (type === 'success') {
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    );
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center space-y-2 pointer-events-none w-full max-w-sm">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className={`w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${
            toast.isClosing ? 'animate-slide-out-up' : 'animate-slide-in-down'
          }`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon(toast.type)}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{toast.message}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;