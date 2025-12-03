import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

type ToastType = 'success' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  isClosing?: boolean;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = toastId.current++;
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      // Trigger the closing animation
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id ? { ...toast, isClosing: true } : toast
        )
      );

      // Wait for animation to finish, then remove the toast
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, 300); // Corresponds to animation duration
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};