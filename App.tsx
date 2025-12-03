import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { PreOrderProvider } from './context/PreOrderContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import Login from './components/Login';
import CustomerDashboard from './components/customer/CustomerDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import Header from './components/Header';
import ToastContainer from './components/common/ToastContainer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <PreOrderProvider>
                <FavoritesProvider>
                  <ToastProvider>
                    <Main />
                  </ToastProvider>
                </FavoritesProvider>
              </PreOrderProvider>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

const Snowfall: React.FC = () => {
  const snowflakes = React.useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}vw`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      return <div key={i} className="snowflake" style={style} />;
    });
  }, []);

  return <div id="snow-container">{snowflakes}</div>;
};

const Main: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  React.useEffect(() => {
    const root = window.document.documentElement;
    // Clear all theme classes and inline styles
    root.classList.remove('light', 'dark', 'grey', 'theme-christmas');
    root.style.backgroundColor = '';

    if (theme === 'christmas') {
      // The Christmas theme is designed as a dark theme variant
      root.classList.add('dark', 'theme-christmas');
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const renderContent = () => {
    if (!user) {
      return <Login />;
    }
    if (user.type === 'customer') {
      return <CustomerDashboard />;
    }
    if (user.type === 'vendor') {
      return <VendorDashboard />;
    }
    return <Login />;
  };

  return (
    <div className={`min-h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 ${theme === 'grey' ? 'bg-gray-600 dark:bg-gray-700' : ''}`}>
      {theme === 'christmas' && <Snowfall />}
      <ToastContainer />
      {user && <Header />}
      <main className="p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;