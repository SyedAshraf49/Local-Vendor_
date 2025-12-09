import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslations } from '../../hooks/useTranslations';
import { MOCK_PRODUCTS } from '../../data/products';
import { HeartIcon } from '../common/Icons';
import ProductIcon from './ProductIcon';

const FavoritesList: React.FC = () => {
    const { favoriteItems, removeFavorite } = useFavorites();
    const { user } = useAuth();
    const t = useTranslations();

    const myFavoriteProducts = user
        ? MOCK_PRODUCTS.filter(product => favoriteItems.some(fav => fav.productId === product.id && fav.customerName === user.name))
        : [];
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <HeartIcon className="h-7 w-7 text-red-500" filled={true}/>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.favorites}</h3>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
                {myFavoriteProducts.length > 0 ? (
                    myFavoriteProducts.map(product => (
                        <div key={product.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
                            <div className="flex items-center gap-3">
                                <ProductIcon category={product.category} containerClassName="h-12 w-12 flex-shrink-0" className="h-6 w-6" />
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{product.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">₹{product.offer ? product.offer.newPrice.toFixed(2) : product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => user && removeFavorite(product.id, user.name)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                                title={t.removeFromFavorites}
                            >
                                <HeartIcon className="h-5 w-5" filled={true}/>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">{t.emptyFavoritesList}</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesList;
