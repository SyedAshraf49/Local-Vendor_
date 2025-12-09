import { type Product } from '../types';

const futureDate = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const MOCK_PRODUCTS: Product[] = [
    // --- Royapuram Vendor ---
    { id: 1, name: 'Tomato', category: 'vegetables', price: 50, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(10), stock: 100, rating: { average: 4.5, count: 120 }, location: 'royapuram' },
    { id: 5, name: 'Apple', category: 'fruits', price: 120, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(20), stock: 120, rating: { average: 4.6, count: 180 }, location: 'royapuram' },
    { id: 12, name: 'Cabbage', category: 'vegetables', price: 30, unit: 'kg', unitIncrement: 0.5, expiryDate: futureDate(8), stock: 70, rating: { average: 4.3, count: 88 }, location: 'royapuram' },
    { id: 13, name: 'Milk (Full Cream)', category: 'dairy', price: 65, unit: 'L', unitIncrement: 0.5, expiryDate: futureDate(4), stock: 40, offer: { percentage: 5, newPrice: 61.75 }, rating: { average: 4.8, count: 210 }, location: 'royapuram' },
    { id: 14, name: 'Dark Chocolate (70%)', category: 'chocolates', price: 160, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(200), stock: 50, rating: { average: 4.9, count: 350 }, location: 'royapuram' },
    { id: 15, name: 'Times of India', category: 'newspapers', price: 6, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(1), stock: 150, rating: { average: 4.1, count: 70 }, location: 'royapuram' },
    { id: 16, name: 'Banana (Cavendish)', category: 'fruits', price: 55, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(6), stock: 200, rating: { average: 4.5, count: 190 }, location: 'royapuram' },

    // --- T. Nagar Vendor ---
    { id: 2, name: 'Milk', category: 'dairy', price: 60, unit: 'L', unitIncrement: 0.5, expiryDate: futureDate(5), stock: 50, offer: { percentage: 10, newPrice: 54 }, rating: { average: 4.8, count: 250 }, location: 't.nagar' },
    { id: 6, name: 'Carrot', category: 'vegetables', price: 40, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(15), stock: 150, rating: { average: 4.4, count: 95 }, location: 't.nagar' },
    { id: 9, name: 'Butter Milk', category: 'dairy', price: 20, unit: 'L', unitIncrement: 0.5, expiryDate: futureDate(8), stock: 30, rating: { average: 4.3, count: 60 }, location: 't.nagar' },
    { id: 17, name: 'Cauliflower', category: 'vegetables', price: 45, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(7), stock: 60, offer: { percentage: 10, newPrice: 40.5 }, rating: { average: 4.6, count: 110 }, location: 't.nagar' },
    { id: 18, name: 'Apple (Shimla)', category: 'fruits', price: 130, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(18), stock: 90, rating: { average: 4.7, count: 150 }, location: 't.nagar' },
    { id: 19, name: 'The Hindu', category: 'newspapers', price: 5, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(1), stock: 250, rating: { average: 4.4, count: 120 }, location: 't.nagar' },
    { id: 11, name: 'White Chocolate (100g)', category: 'chocolates', price: 125, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(120), stock: 75, rating: { average: 4.7, count: 150 }, location: 't.nagar' },

    // --- Ashok Nagar Vendor ---
    { id: 3, name: 'The Hindu Newspaper', category: 'newspapers', price: 5, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(1), stock: 200, rating: { average: 4.2, count: 80 }, location: 'ashok nagar' },
    { id: 7, name: 'Yogurt (200g)', category: 'dairy', price: 45, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(12), stock: 60, rating: { average: 4.7, count: 150 }, location: 'ashok nagar' },
    { id: 10, name: 'Cheese (150g)', category: 'dairy', price: 200, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(30), stock: 40, offer: { percentage: 15, newPrice: 170 }, rating: { average: 4.8, count: 190 }, location: 'ashok nagar' },
    { id: 20, name: 'Brinjal (Eggplant)', category: 'vegetables', price: 35, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(9), stock: 80, rating: { average: 4.2, count: 75 }, location: 'ashok nagar' },
    { id: 21, name: 'Tomato (Hybrid)', category: 'vegetables', price: 55, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(11), stock: 110, rating: { average: 4.6, count: 130 }, location: 'ashok nagar' },
    { id: 22, name: 'Banana (Robusta)', category: 'fruits', price: 45, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(5), stock: 150, rating: { average: 4.4, count: 180 }, location: 'ashok nagar' },
    
    // --- Saidapetu Vendor ---
    { id: 4, name: 'Dark Chocolate (100g)', category: 'chocolates', price: 150, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(180), stock: 80, rating: { average: 4.9, count: 310 }, location: 'saidapetu' },
    { id: 8, name: 'Banana', category: 'fruits', price: 50, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(7), stock: 180, offer: { percentage: 20, newPrice: 40 }, rating: { average: 4.5, count: 210 }, location: 'saidapetu' },
    { id: 23, name: 'White Chocolate (100g)', category: 'chocolates', price: 120, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(120), stock: 60, rating: { average: 4.7, count: 150 }, location: 'saidapetu' },
    { id: 24, name: 'Cabbage (Green)', category: 'vegetables', price: 28, unit: 'kg', unitIncrement: 0.5, expiryDate: futureDate(9), stock: 65, rating: { average: 4.4, count: 80 }, location: 'saidapetu' },
    { id: 25, name: 'Carrot (Ooty)', category: 'vegetables', price: 42, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(14), stock: 130, offer: { percentage: 5, newPrice: 39.9 }, rating: { average: 4.5, count: 105 }, location: 'saidapetu' },
    { id: 26, name: 'Milk (Toned)', category: 'dairy', price: 58, unit: 'L', unitIncrement: 0.5, expiryDate: futureDate(6), stock: 80, rating: { average: 4.7, count: 230 }, location: 'saidapetu' },
];