import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { type PreOrderItem } from '../types';

interface PreOrderContextType {
  preOrderItems: PreOrderItem[];
  addPreOrderItem: (productId: number, productName: string, customerName: string) => void;
  removePreOrderItem: (productId: number, customerName: string) => void;
  isPreOrdered: (productId: number, customerName: string) => boolean;
}

const PreOrderContext = createContext<PreOrderContextType | undefined>(undefined);

export const PreOrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preOrderItems, setPreOrderItems] = useState<PreOrderItem[]>([]);

  const addPreOrderItem = useCallback((productId: number, productName: string, customerName: string) => {
    setPreOrderItems((prevItems) => {
      const exists = prevItems.some(item => item.productId === productId && item.customerName === customerName);
      if (!exists) {
        const newItem: PreOrderItem = {
          id: Date.now(),
          productId,
          productName,
          customerName,
        };
        return [...prevItems, newItem];
      }
      return prevItems;
    });
  }, []);

  const removePreOrderItem = useCallback((productId: number, customerName: string) => {
    setPreOrderItems((prevItems) => prevItems.filter((item) => !(item.productId === productId && item.customerName === customerName)));
  }, []);

  const isPreOrdered = useCallback((productId: number, customerName: string) => {
      return preOrderItems.some(item => item.productId === productId && item.customerName === customerName);
  }, [preOrderItems]);

  return (
    <PreOrderContext.Provider value={{ preOrderItems, addPreOrderItem, removePreOrderItem, isPreOrdered }}>
      {children}
    </PreOrderContext.Provider>
  );
};

export const usePreOrder = (): PreOrderContextType => {
  const context = useContext(PreOrderContext);
  if (!context) {
    throw new Error('usePreOrder must be used within a PreOrderProvider');
  }
  return context;
};
