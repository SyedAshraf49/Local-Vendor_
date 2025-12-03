import React, { useState } from 'react';
import { type Product, type ProductLocation } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

interface ProductEditModalProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onSave, onClose }) => {
  const t = useTranslations();
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'rating' | 'offer'>>({
    name: product?.name || '',
    price: product?.price || 0,
    category: product?.category || 'vegetables',
    stock: product?.stock || 0,
    expiryDate: product?.expiryDate || '',
    location: product?.location || 'royapuram',
    unit: product?.unit || 'pcs',
    unitIncrement: product?.unitIncrement || 1,
  });

  const formInputClasses = "block px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' || name === 'unitIncrement' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProduct: Product = {
      ...product, // keeps original id, rating, etc. if editing
      id: product?.id || 0, // temp id, will be replaced in parent
      ...formData,
    };
    onSave(finalProduct);
  };
  
  const categories: Product['category'][] = ['vegetables', 'fruits', 'dairy', 'chocolates', 'newspapers'];
  const locations: ProductLocation[] = ['royapuram', 't.nagar', 'ashok nagar', 'saidapetu'];
  const units: Product['unit'][] = ['pcs', 'kg', 'L'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg animate-scale-in">
        <header className="p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{product ? t.editProduct : t.addProduct}</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <main className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.productName}</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.price}</label>
                    <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`} step="0.01"/>
                </div>
                 <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.stock}</label>
                    <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.category}</label>
                  <select name="category" id="category" value={formData.category} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`}>
                    <option value="" disabled>{t.selectCategory}</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{t[cat]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.location}</label>
                  <select name="location" id="location" value={formData.location} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`}>
                    {locations.map(loc => (
                        <option key={loc} value={loc} className="capitalize">{loc}</option>
                    ))}
                  </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.unit}</label>
                  <select name="unit" id="unit" value={formData.unit} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`}>
                    {units.map(u => (
                        <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                    <label htmlFor="unitIncrement" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.increment}</label>
                    <input type="number" name="unitIncrement" id="unitIncrement" value={formData.unitIncrement} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`} step="0.01"/>
                </div>
            </div>
             <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.expiryDate}</label>
              <input type="date" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleChange} required className={`mt-1 w-full ${formInputClasses}`} />
            </div>
          </main>

          <footer className="p-4 border-t dark:border-gray-700 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500">{t.close}</button>
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700">{t.saveChanges}</button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;