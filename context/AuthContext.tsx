
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { type User, type UserType } from '../types';

interface AuthContextType {
  user: User | null;
  login: (name: string, type: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((name: string, type: UserType) => {
    // In a real app, you'd verify credentials here
    setUser({ name, type });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
