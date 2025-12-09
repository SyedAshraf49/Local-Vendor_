import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { useCart } from '../context/CartContext';
import { UserIcon, SunIcon, MoonIcon, PaletteIcon, TranslateIcon, CartIcon, HamburgerIcon, XIcon, ChristmasTreeIcon } from './common/Icons';
import CartModal from './customer/CartModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { cartItems } = useCart();
  const t = useTranslations();

  const [profileOpen, setProfileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  
  const availableLanguages: { code: 'en' | 'ta' | 'hi' | 'te' | 'ml'; nativeName: string }[] = [
    { code: 'en', nativeName: 'English' },
    { code: 'ta', nativeName: 'தமிழ்' },
    { code: 'hi', nativeName: 'हिन्दी' },
    { code: 'te', nativeName: 'తెలుగు' },
    { code: 'ml', nativeName: 'മലയാളം' },
  ];

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const CartButton = () => (
    <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
      <CartIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      {totalCartItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {totalCartItems}
          </span>
      )}
    </button>
  );

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center transition-colors duration-300 sticky top-0 z-30">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">Local Connect</h1>
        
        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative" ref={languageRef}>
            <button onClick={() => setLanguageOpen(!languageOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <TranslateIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 animate-scale-in origin-top-right">
                {availableLanguages.map(lang => (
                  <button key={lang.code} onClick={() => { setLanguage(lang.code); setLanguageOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700`}>
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><SunIcon className="h-4 w-4"/></button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><MoonIcon className="h-4 w-4"/></button>
              <button onClick={() => setTheme('grey')} className={`p-1.5 rounded-full ${theme === 'grey' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><PaletteIcon className="h-4 w-4"/></button>
              <button onClick={() => setTheme('christmas')} className={`p-1.5 rounded-full ${theme === 'christmas' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><ChristmasTreeIcon className="h-4 w-4"/></button>
          </div>
          {user?.type === 'customer' && <CartButton />}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <UserIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 animate-scale-in origin-top-right">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.type === 'customer' ? t.customer : t.vendor}</p>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); setProfileOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                  {t.logout}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Controls */}
        <div className="flex items-center space-x-2 md:hidden">
            {user?.type === 'customer' && <CartButton />}
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <HamburgerIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/50 animate-fade-in" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-80 max-w-[80vw] h-full bg-white dark:bg-gray-900 flex flex-col animate-slide-in-right">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                  <div className="flex items-center gap-3">
                      <UserIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                      <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-100">{user?.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.type === 'customer' ? t.customer : t.vendor}</p>
                      </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <XIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </button>
              </div>
              <nav className="flex-grow p-4 space-y-4">
                  <div>
                      <h3 className="px-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t.language}</h3>
                       <div className="mt-2 space-y-1">
                          {availableLanguages.map(lang => (
                              <button key={lang.code} onClick={() => { setLanguage(lang.code); setMobileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-left ${language === lang.code ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                  <span>{lang.nativeName}</span>
                              </button>
                          ))}
                      </div>
                  </div>
                  <div className="pt-4">
                      <h3 className="px-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display</h3>
                      <div className="mt-2 space-y-1">
                          <div className="px-2 pt-2">
                              <p className="text-gray-700 dark:text-gray-200 mb-2">Theme</p>
                              <div className="flex items-center justify-around space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                                  <button onClick={() => {setTheme('light'); setMobileMenuOpen(false);}} className={`w-full p-1.5 rounded-full ${theme === 'light' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><SunIcon className="h-5 w-5 mx-auto"/></button>
                                  <button onClick={() => {setTheme('dark'); setMobileMenuOpen(false);}} className={`w-full p-1.5 rounded-full ${theme === 'dark' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><MoonIcon className="h-5 w-5 mx-auto"/></button>
                                  <button onClick={() => {setTheme('grey'); setMobileMenuOpen(false);}} className={`w-full p-1.5 rounded-full ${theme === 'grey' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><PaletteIcon className="h-5 w-5 mx-auto"/></button>
                                  <button onClick={() => {setTheme('christmas'); setMobileMenuOpen(false);}} className={`w-full p-1.5 rounded-full ${theme === 'christmas' ? 'bg-indigo-500 text-white' : 'text-gray-500'}`}><ChristmasTreeIcon className="h-5 w-5 mx-auto"/></button>
                              </div>
                          </div>
                      </div>
                  </div>
              </nav>
              <div className="p-4 border-t dark:border-gray-700">
                  <a href="#" onClick={(e) => { e.preventDefault(); logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md">
                      {t.logout}
                  </a>
              </div>
          </div>
        </div>
      )}

      {isCartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Header;