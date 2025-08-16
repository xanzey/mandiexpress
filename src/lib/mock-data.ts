import type { Product, Order } from '@/types';

export const mockProducts: Product[] = [
  { id: '1', name: 'Fresh Tomatoes', price: 50, image: 'https://placehold.co/600x400.png', availability: 'In Stock', dataAiHint: 'tomatoes' },
  { id: '2', name: 'Spinach (Palak)', price: 30, image: 'https://placehold.co/600x400.png', availability: 'In Stock', dataAiHint: 'spinach' },
  { id: '3', name: 'Potatoes', price: 40, image: 'https://placehold.co/600x400.png', availability: 'In Stock', dataAiHint: 'potatoes' },
  { id: '4', name: 'Onions', price: 60, image: 'https://placehold.co/600x400.png', availability: 'In Stock', dataAiHint: 'onions' },
  { id: '5', name: 'Carrots', price: 45, image: 'https://placehold.co/600x400.png', availability: 'Out of Stock', dataAiHint: 'carrots' },
  { id: '6', name: 'Cucumbers', price: 35, image: 'https://placehold.co/600x400.png', availability: 'In Stock', dataAiHint: 'cucumbers' },
  { id: '7', name: 'Bell Peppers (Capsicum)', price: 70, image: 'https://placehold.co/600x400.png', availability: 'In Stock', dataAiHint: 'bell peppers' },
  { id: '8', name: 'Broccoli', price: 120, image: 'https://placehold.co/600x400.png', availability: 'In Stock', dataAiHint: 'broccoli' },
];

export const mockOrders: Order[] = [
    { 
        id: 'ORD001', 
        items: [{ product: mockProducts[0], quantity: 2 }, { product: mockProducts[2], quantity: 1 }], 
        total: 140, 
        status: 'Out for Delivery',
        deliverySlot: 'Morning (7-9 AM)',
        date: '2024-07-28'
    },
    { 
        id: 'ORD002', 
        items: [{ product: mockProducts[1], quantity: 1 }, { product: mockProducts[3], quantity: 3 }], 
        total: 210, 
        status: 'Preparing',
        deliverySlot: 'Evening (5-8 PM)',
        date: '2024-07-28'
    },
    { 
        id: 'ORD003', 
        items: [{ product: mockProducts[6], quantity: 2 }], 
        total: 140, 
        status: 'Delivered',
        deliverySlot: 'Morning (7-9 AM)',
        date: '2024-07-27'
    },
     { 
        id: 'ORD004', 
        items: [{ product: mockProducts[7], quantity: 1 }], 
        total: 120, 
        status: 'Pending',
        deliverySlot: 'Evening (5-8 PM)',
        date: '2024-07-28'
    },
];
