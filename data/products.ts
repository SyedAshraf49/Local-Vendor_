import { type Product } from '../types';

const futureDate = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Tomato', category: 'vegetables', price: 50, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(10), stock: 100, rating: { average: 4.5, count: 120 }, location: 'royapuram' },
    { id: 2, name: 'Milk', category: 'dairy', price: 60, unit: 'L', unitIncrement: 0.5, expiryDate: futureDate(5), stock: 50, offer: { percentage: 10, newPrice: 54 }, rating: { average: 4.8, count: 250 }, location: 't.nagar' },
    { id: 3, name: 'The Hindu Newspaper', category: 'newspapers', price: 5, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(1), stock: 200, rating: { average: 4.2, count: 80 }, location: 'ashok nagar' },
    { id: 4, name: 'Dark Chocolate (100g)', category: 'chocolates', price: 150, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(180), stock: 80, rating: { average: 4.9, count: 310 }, location: 'saidapetu' },
    { id: 5, name: 'Apple', category: 'fruits', price: 120, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(20), stock: 120, rating: { average: 4.6, count: 180 }, location: 'royapuram' },
    { id: 6, name: 'Carrot', category: 'vegetables', price: 40, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(15), stock: 150, rating: { average: 4.4, count: 95 }, location: 't.nagar' },
    { id: 7, name: 'Yogurt (200g)', category: 'dairy', price: 45, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(12), stock: 60, rating: { average: 4.7, count: 150 }, location: 'ashok nagar' },
    { id: 8, name: 'Banana', category: 'fruits', price: 50, unit: 'kg', unitIncrement: 0.25, expiryDate: futureDate(7), stock: 180, offer: { percentage: 20, newPrice: 40 }, rating: { average: 4.5, count: 210 }, location: 'saidapetu' },
    { id: 9, name: 'Butter Milk', category: 'dairy', price: 20, unit: 'L', unitIncrement: 0.5, expiryDate: futureDate(8), stock: 30, rating: { average: 4.3, count: 60 }, location: 't.nagar' },
    { id: 10, name: 'Cheese (150g)', category: 'dairy', price: 200, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(30), stock: 40, offer: { percentage: 15, newPrice: 170 }, rating: { average: 4.8, count: 190 }, location: 'ashok nagar' },
    { id: 11, name: 'White Chocolate (100g)', category: 'chocolates', price: 120, unit: 'pcs', unitIncrement: 1, expiryDate: futureDate(120), stock: 60, rating: { average: 4.7, count: 150 }, location: 'saidapetu' },
];