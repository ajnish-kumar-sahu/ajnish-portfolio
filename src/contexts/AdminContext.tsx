import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  adminName: string;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

// Simple admin authentication (in production, use proper backend auth)
const ADMIN_PASSWORD = 'ajnish2026';

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const adminName = 'Ajnish Kumar';

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
