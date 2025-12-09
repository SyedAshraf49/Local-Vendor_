import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslations } from '../../hooks/useTranslations';
import { useToast } from '../../context/ToastContext';
import { type Location, type Order, type ProductLocation, type CartItem } from '../../types';
import ThankYouModal from './ThankYouModal';

interface CheckoutModalProps {
  onClose: () => void;
}

const VENDOR_LOCATIONS: Record<ProductLocation, Location> = {
    'royapuram': { lat: 13.1143, lng: 80.2936 },
    't.nagar': { lat: 13.0392, lng: 80.2337 },
    'ashok nagar': { lat: 13.0406, lng: 80.2123 },
    'saidapetu': { lat: 13.0232, lng: 80.2235 }
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const t = useTranslations();
  const { addToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [customerLocation, setCustomerLocation] = useState<Location | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [locationError, setLocationError] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [address, setAddress] = useState('');


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCustomerLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError('');
        setIsFetchingLocation(false);
      },
      (error) => {
        setLocationError(t.locationFetchFailed);
        console.error("Geolocation error: ", error);
        setIsFetchingLocation(false);
      }
    );
  }, [t.locationFetchFailed]);

  const handlePlaceOrder = () => {
    const hasWhiteChocolate = cartItems.some(item => item.name === 'White Chocolate (100g)');
    const hasDarkChocolate = cartItems.some(item => item.name === 'Dark Chocolate (100g)' || item.name === 'Dark Chocolate (70%)');

    if (hasWhiteChocolate && hasDarkChocolate) {
      addToast("december i found ya", 'success');
    }
    
    if (!user || !fullName.trim() || !address.trim()) return;

    // Group items by vendor location
    const ordersByVendor = cartItems.reduce<Record<ProductLocation, CartItem[]>>((acc, item) => {
        if (!acc[item.location]) {
            acc[item.location] = [];
        }
        acc[item.location].push(item);
        return acc;
    }, {} as Record<ProductLocation, CartItem[]>);

    // Create a separate order for each vendor
    Object.entries(ordersByVendor).forEach(([location, items]) => {
        const vendorLocationName = location as ProductLocation;
        const vendorLocation = VENDOR_LOCATIONS[vendorLocationName];
        const total = items.reduce((sum, item) => sum + (item.offer ? item.offer.newPrice : item.price) * item.quantity, 0);

        const newOrder: Order = {
            id: `ORD-${Date.now()}-${vendorLocationName.substring(0, 2).toUpperCase()}`,
            items,
            total,
            customerName: fullName,
            customerLocation,
            customerAddress: address,
            vendorLocation,
            vendorLocationName,
            status: 'Order Placed',
            timestamp: new Date(),
        };
        addOrder(newOrder);
    });

    addToast(t.orderPlacedToast, 'success');
    clearCart();
    setShowThankYou(true);
  };
  
  if (showThankYou) {
      return <ThankYouModal onClose={onClose} />;
  }

  const isOrderButtonDisabled = !address.trim() || !fullName.trim() || cartItems.length === 0;
  
  const locationStatusText = isFetchingLocation 
    ? t.fetchingLocation 
    : locationError 
    ? locationError 
    : 'Location found!';
    
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.offer ? item.offer.newPrice : item.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md m-4 animate-scale-in">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t.checkout}</h2>
        
        <div className="space-y-4 mb-6">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.fullName}</label>
                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
            </div>
             <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.address}</label>
                <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
            </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{t.paymentMethod}</h3>
          <div className="space-y-2">
            <label className="flex items-center p-3 border dark:border-gray-600 rounded-md has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:border-indigo-500">
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="form-radio h-4 w-4 text-indigo-600"/>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{t.cashOnDelivery}</span>
            </label>
            <label className="flex items-center p-3 border dark:border-gray-600 rounded-md has-[:checked]:bg-indigo-50 dark:has-[:checked]:bg-indigo-900/50 has-[:checked]:border-indigo-500">
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="form-radio h-4 w-4 text-indigo-600"/>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{t.creditCard}</span>
            </label>
          </div>
        </div>

        <div className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4 h-5">
            {locationStatusText}
        </div>
        
        <div className="flex justify-between items-center font-bold text-xl mb-2">
            <span className="text-gray-800 dark:text-gray-200">{t.total}:</span>
            <span className="text-indigo-600 dark:text-indigo-400">₹{cartTotal.toFixed(2)}</span>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={onClose} className="w-full bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 py-2 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500">
            {t.close}
          </button>
          <button onClick={handlePlaceOrder} disabled={isOrderButtonDisabled} className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
            {t.placeOrder}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;