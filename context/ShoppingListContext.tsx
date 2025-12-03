import React, { createContext, useContext, ReactNode } from 'react';

// Dummy context to prevent errors from leftover imports and to neutralize the feature.
const ShoppingListContext = createContext<any>(undefined);

export const ShoppingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dummyValue = {
    shoppingListItems: [],
    addToShoppingList: () => {},
    removeFromShoppingList: () => {},
    isInShoppingList: () => false,
  };
  return (
    <ShoppingListContext.Provider value={dummyValue}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = (): any => {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    // This provider isn't used, but we keep the hook structure to avoid breaking imports.
    return {
        shoppingListItems: [],
        addToShoppingList: () => {},
        removeFromShoppingList: () => {},
        isInShoppingList: () => false,
    }; 
  }
  return context;
};