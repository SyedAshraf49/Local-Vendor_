
import React, { useState, useEffect } from 'react';
import { type Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { usePreOrder } from '../../context/PreOrderContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslations } from '../../hooks/useTranslations';
import { useToast } from '../../context/ToastContext';
import { StarIcon, PlusIcon, LocationMarkerIcon, MinusIcon, CheckIcon, BookOpenIcon, HeartIcon, CalendarDaysIcon } from '../common/Icons';
import ProductIcon from './ProductIcon';

interface ProductCardProps {
  product: Product;
  index: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon 
          key={index} 
          className={`h-4 w-4 ${rating > index ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          filled={rating > index}
        />
      ))}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();
  const { addPreOrderItem, isPreOrdered } = usePreOrder();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const t = useTranslations();
  const { addToast } = useToast();
  const [justAdded, setJustAdded] = useState(false);
  
  const increment = product.unitIncrement || 1;
  const initialQuantity = increment;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity.toFixed(product.unit === 'pcs' ? 0 : 2));

  useEffect(() => {
    setInputValue(quantity.toFixed(product.unit === 'pcs' ? 0 : 2));
  }, [quantity, product.unit]);

  const expiryDate = new Date(product.expiryDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize for accurate day comparison
  
  const isExpired = expiryDate < today;

  const diffTime = expiryDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const getExpiryText = () => {
    if (isExpired) return null; // Don't show text if expired, overlay is shown
    if (daysRemaining === 0) return t.expiresToday;
    if (daysRemaining === 1) return t.expiresTomorrow;
    return `${t.expiresIn} ${daysRemaining} ${daysRemaining > 1 ? t.days : t.day}`;
  };
  const expiryText = getExpiryText();

  const maxQty = product.unit === 'pcs' ? 10 : 5; // Max 10 items, or 5kg/5L

  const handleIncrement = () => {
    setQuantity(prev => Math.min(prev + increment, maxQty));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - increment, increment));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    let newQuantity = parseFloat(inputValue);

    if (isNaN(newQuantity) || newQuantity <= 0) {
        setQuantity(initialQuantity);
        return;
    }
    
    // Snap to nearest increment
    const snappedQuantity = Math.round(newQuantity / increment) * increment;
    
    // Ensure it's at least one increment and does not exceed max
    const finalQuantity = Math.min(Math.max(snappedQuantity, increment), maxQty);

    setQuantity(finalQuantity);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(t.itemAddedToCart, 'success');
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };
  
  const handlePreOrder = () => {
    if (user) {
      addPreOrderItem(product.id, product.name, user.name);
      addToast(t.itemPreOrdered, 'success');
    }
  };

  const handleToggleFavorite = () => {
    if (!user) return;
    if (isProductFavorite) {
      removeFavorite(product.id, user.name);
      addToast(t.removedFromFavorites, 'success');
    } else {
      addFavorite(product.id, user.name);
      addToast(t.addedToFavorites, 'success');
    }
  };

  const itemIsPreOrdered = user ? isPreOrdered(product.id, user.name) : false;
  const isProductFavorite = user ? isFavorite(product.id, user.name) : false;

  return (
    <div 
      className={`bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up ${isExpired ? 'border-2 border-red-500 dark:border-red-400' : 'border border-gray-200 dark:border-gray-700'}`}
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
    >
      <div className="relative">
        <ProductIcon category={product.category} containerClassName="w-full aspect-square" className="h-16 w-16" />
        {isExpired && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold bg-red-600 px-3 py-1 rounded-md">{t.expired}</span>
            </div>
        )}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full text-red-500 hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
          title={isProductFavorite ? t.removeFromFavorites : t.addToFavorites}
          aria-label={isProductFavorite ? t.removeFromFavorites : t.addToFavorites}
        >
          <HeartIcon className="h-5 w-5" filled={isProductFavorite} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex-1">{product.name}</h4>
            {product.rating && (
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <StarRating rating={product.rating.average} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">({product.rating.count})</span>
              </div>
            )}
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-4">
            <span className="capitalize">{t[product.category]}</span>
            <div className="flex items-center gap-1">
                <LocationMarkerIcon className="h-4 w-4" />
                <span className="capitalize">{product.location}</span>
            </div>
        </div>
        
        <div className="flex-grow" />

        <div className="my-2">
            {product.offer ? (
                <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      ₹{product.offer.newPrice.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / {product.unit}</span>
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{product.price.toFixed(2)}
                      <span className="text-xs"> / {product.unit}</span>
                    </p>
                    <span className="text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-0.5 rounded-full">{product.offer.percentage}% OFF</span>
                </div>
            ) : (
                <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  ₹{product.price.toFixed(2)}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / {product.unit}</span>
                </p>
            )}
        </div>
        
        <div className="mt-1 mb-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            {expiryText && (
                <div className="flex items-center gap-1.5">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                    <span>{expiryText}</span>
                </div>
            )}
            {!isExpired && (
                 <div className="flex items-center gap-1.5">
                    <span className="font-medium">{t.stockInfo}</span>
                    <span>{product.stock} {product.unit !== 'pcs' ? product.unit : ''}</span>
                </div>
            )}
        </div>
        
        <div className="mt-auto pt-1 flex items-stretch justify-between gap-2">
            <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600">
                <button onClick={handleDecrement} disabled={quantity <= increment || isExpired} className="p-2 text-gray-600 dark:text-gray-300 disabled:opacity-50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md"><MinusIcon className="h-4 w-4"/></button>
                {product.unit === 'pcs' ? (
                  <span className="px-2 text-base font-semibold text-gray-800 dark:text-gray-100 w-16 text-center">{quantity.toFixed(0)}</span>
                ) : (
                   <input
                      type="text"
                      inputMode="decimal"
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      disabled={isExpired}
                      className="w-16 text-center bg-transparent border-l border-r border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 text-base font-semibold text-gray-800 dark:text-gray-100 py-2 px-0 disabled:opacity-50"
                  />
                )}
                <button onClick={handleIncrement} disabled={isExpired} className="p-2 text-gray-600 dark:text-gray-300 disabled:opacity-50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md"><PlusIcon className="h-4 w-4"/></button>
            </div>
            <button
                onClick={handleAddToCart}
                disabled={isExpired || justAdded}
                className={`flex-grow py-2 px-3 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-sm flex items-center justify-center ${
                  justAdded 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed'
                }`}
            >
                {justAdded ? (
                    <span className="flex items-center gap-1 animate-scale-in">
                        <CheckIcon className="h-5 w-5" />
                        <span>{t.added}</span>
                    </span>
                ) : (
                    t.addToCart
                )}
            </button>
            <button
                onClick={handlePreOrder}
                disabled={itemIsPreOrdered || isExpired}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title={t.preOrder}
            >
                 {itemIsPreOrdered ? (
                    <CheckIcon className="h-5 w-5 text-green-500"/>
                ) : (
                    <BookOpenIcon className="h-5 w-5 text-gray-700 dark:text-gray-200"/>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;