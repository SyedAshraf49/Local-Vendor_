import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
