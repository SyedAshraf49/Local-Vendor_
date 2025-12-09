
import React from 'react';
import { type Product } from '../../types';
import { VegetableMedleyIcon, NewspaperStackIcon, AppleIcon, MilkCartonIcon, ChocolateWrapperIcon } from '../common/Icons';

export const categoryStyles: Record<Product['category'], { Icon: React.FC<{className?: string}>, bgColor: string, iconColor: string }> = {
    vegetables: { Icon: VegetableMedleyIcon, bgColor: 'bg-orange-100 dark:bg-orange-900/50', iconColor: 'text-orange-600 dark:text-orange-400' },
    fruits: { Icon: AppleIcon, bgColor: 'bg-red-100 dark:bg-red-900/50', iconColor: 'text-red-600 dark:text-red-400' },
    dairy: { Icon: MilkCartonIcon, bgColor: 'bg-blue-100 dark:bg-blue-900/50', iconColor: 'text-blue-600 dark:text-blue-400' },
    chocolates: { Icon: ChocolateWrapperIcon, bgColor: 'bg-amber-100 dark:bg-amber-900/50', iconColor: 'text-amber-700 dark:text-amber-500' },
    newspapers: { Icon: NewspaperStackIcon, bgColor: 'bg-gray-200 dark:bg-gray-600', iconColor: 'text-gray-700 dark:text-gray-300' }
};

interface ProductIconProps {
  category: Product['category'];
  className?: string;
  containerClassName?: string;
}

const ProductIcon: React.FC<ProductIconProps> = ({ category, className, containerClassName }) => {
    const { Icon, bgColor, iconColor } = categoryStyles[category] || categoryStyles.vegetables;
    return (
        <div className={`flex items-center justify-center rounded-md ${bgColor} ${containerClassName}`}>
            <Icon className={`${iconColor} ${className}`} />
        </div>
    );
};
export default ProductIcon;