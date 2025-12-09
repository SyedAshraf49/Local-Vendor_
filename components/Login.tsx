import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { type UserType, type ProductLocation } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { UserIcon } from './common/Icons';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('customer');
  const { login } = useAuth();
  const t = useTranslations();

  const vendorCredentials: Record<string, ProductLocation> = {
    vendorR: 'royapuram',
    vendorT: 't.nagar',
    vendorA: 'ashok nagar',
    vendorS: 'saidapetu',
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      const isCustomer = userType === 'customer' && username === 'customer' && password === 'pass';
      const vendorLocation = vendorCredentials[username];
      const isVendor = userType === 'vendor' && vendorLocation && password === 'pass';
      
      if (isCustomer) {
         login(username, userType);
      } else if (isVendor) {
         login(username, userType, vendorLocation);
      } else {
        alert('Invalid credentials.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl space-y-8">
        <div className="text-center">
            <UserIcon className="mx-auto h-12 w-12 text-indigo-500"/>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">{t.loginAs}</h2>
        </div>

        <div className="flex justify-center rounded-md -space-x-px">
            <button onClick={() => setUserType('customer')} className={`py-2 px-4 w-1/2 border dark:border-gray-600 rounded-l-md text-sm font-medium transition-colors ${userType === 'customer' ? 'bg-indigo-600 text-white z-10' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}>
                {t.customer}
            </button>
            <button onClick={() => setUserType('vendor')} className={`py-2 px-4 w-1/2 border dark:border-gray-600 rounded-r-md text-sm font-medium transition-colors ${userType === 'vendor' ? 'bg-indigo-600 text-white z-10' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}>
                {t.vendor}
            </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">{t.username}</label>
              <input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t.username}/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">{t.password}</label>
              <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t.password}/>
            </div>
          </div>
          
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.636-1.21 2.242-1.21 2.878 0l5.394 10.273c.636 1.21-.114 2.627-1.439 2.627H4.302c-1.325 0-2.075-1.417-1.439-2.627L8.257 3.099zM9 12a1 1 0 112 0 1 1 0 01-2 0zm1-4a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-semibold">Test Credentials</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                        <li>
                            Customer: <code className="font-mono p-1 bg-yellow-200 dark:bg-yellow-800 rounded text-xs">customer / pass</code>
                        </li>
                        <li>
                            Royapuram: <code className="font-mono p-1 bg-yellow-200 dark:bg-yellow-800 rounded text-xs">vendorR / pass</code>
                        </li>
                        <li>
                            T. Nagar: <code className="font-mono p-1 bg-yellow-200 dark:bg-yellow-800 rounded text-xs">vendorT / pass</code>
                        </li>
                        <li>
                            Ashok Nagar: <code className="font-mono p-1 bg-yellow-200 dark:bg-yellow-800 rounded text-xs">vendorA / pass</code>
                        </li>
                        <li>
                            Saidapetu: <code className="font-mono p-1 bg-yellow-200 dark:bg-yellow-800 rounded text-xs">vendorS / pass</code>
                        </li>
                    </ul>
                </div>
            </div>
          </div>

          <div>
            <button type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {t.login}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;