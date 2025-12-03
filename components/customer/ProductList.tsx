import React, { useState, useMemo, useEffect } from 'react';
import { type Product } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { MOCK_PRODUCTS } from '../../data/products';

const ProductList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations();
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    const categories: (Product['category'] | 'all')[] = ['all', 'vegetables', 'fruits', 'dairy', 'chocolates', 'newspapers'];
    
    const filteredProducts = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return MOCK_PRODUCTS.filter(product => {
            const expiryDate = new Date(product.expiryDate);
            if (expiryDate < today) {
                return false; // Filter out expired products
            }

            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.products}</h3>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t.searchProducts}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                    >
                        {category === 'all' ? 'All' : t[category]}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 col-span-full text-center py-8">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;