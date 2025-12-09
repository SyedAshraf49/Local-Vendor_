import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { type FavoriteItem } from '../types';

interface FavoritesContextType {
  favoriteItems: FavoriteItem[];
  addFavorite: (productId: number, customerName: string) => void;
  removeFavorite: (productId: number, customerName: string) => void;
  isFavorite: (productId: number, customerName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  const addFavorite = useCallback((productId: number, customerName: string) => {
    setFavoriteItems((prevItems) => {
      const exists = prevItems.some(item => item.productId === productId && item.customerName === customerName);
      if (!exists) {
        return [...prevItems, { productId, customerName }];
      }
      return prevItems;
    });
  }, []);

  const removeFavorite = useCallback((productId: number, customerName: string) => {
    setFavoriteItems((prevItems) => prevItems.filter((item) => !(item.productId === productId && item.customerName === customerName)));
  }, []);

  const isFavorite = useCallback((productId: number, customerName: string) => {
      return favoriteItems.some(item => item.productId === productId && item.customerName === customerName);
  }, [favoriteItems]);

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
