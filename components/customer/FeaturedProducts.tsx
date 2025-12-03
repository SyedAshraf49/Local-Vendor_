import React, { useMemo } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '../../data/products';

const FeaturedProducts: React.FC = () => {
    const t = useTranslations();

    const featured = useMemo(() => {
        return MOCK_PRODUCTS.filter(p => p.offer && new Date(p.expiryDate) >= new Date());
    }, []);

    if (featured.length === 0) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.todaysDeals}</h3>
            <div className="flex overflow-x-auto space-x-6 pb-4">
                {featured.map((product, index) => (
                    <div key={product.id} className="flex-shrink-0 w-full sm:w-64">
                         <ProductCard product={product} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;