import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProductList from './ProductList';
import OrderTracker from './OrderTracker';
import { useTranslations } from '../../hooks/useTranslations';
import RecipeAssistant from './RecipeAssistant';
import { RobotIcon } from '../common/Icons';
import PreOrderList from './PreOrderList';
import FeaturedProducts from './FeaturedProducts';
import RecipeOfTheDay from './RecipeOfTheDay';
import FavoritesList from './FavoritesList';

const CustomerDashboard: React.FC = () => {
    const { user } = useAuth();
    const t = useTranslations();
    const [showRecipeAssistant, setShowRecipeAssistant] = useState(false);

    return (
        <div className="container mx-auto animate-fade-in-up space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t.welcome}, {user?.name}!</h2>
            
            {/* Top Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <OrderTracker />
                <FavoritesList />
                <PreOrderList />
            </div>

            {/* Main Content */}
            <div className="mt-10 space-y-8">
                <FeaturedProducts />
                <ProductList />
                <RecipeOfTheDay />
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-4 z-20">
                 <button 
                    onClick={() => setShowRecipeAssistant(true)}
                    className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                    aria-label={t.recipeAssistant}
                >
                    <RobotIcon className="h-6 w-6" />
                </button>
            </div>
            
             {showRecipeAssistant && (
                <RecipeAssistant onClose={() => setShowRecipeAssistant(false)} />
            )}
        </div>
    );
};

export default CustomerDashboard;
