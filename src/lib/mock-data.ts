import type { Product, Order, Category } from '@/types';

export const mockProducts: Product[] = [
  { id: '1', name: 'Fresh Tomatoes', price: 50, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'tomatoes' },
  { id: '2', name: 'Spinach (Palak)', price: 30, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'spinach' },
  { id: '3', name: 'Potatoes', price: 40, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'potatoes' },
  { id: '4', name: 'Onions', price: 60, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'onions' },
  { id: '5', name: 'Limes', price: 45, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'limes' },
  { id: '6', name: 'Kurkure', price: 20, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'chips' },
  { id: '7', name: 'Lays', price: 20, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'potato chips' },
  { id: '8', name: 'Uncle Chips', price: 20, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'snack' },
  { id: '9', name: 'Bingo', price: 20, image: 'https://placehold.co/100x100.png', availability: 'In Stock', dataAiHint: 'packaged food' },
];

export const mockCategories: Category[] = [
    {
        id: 'veg-fruits',
        name: 'Vegetables & Fruits',
        moreCount: 151,
        productImages: [
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'onions' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'green chili' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'potatoes' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'limes' }
        ]
    },
    {
        id: 'chips',
        name: 'Chips & Namkeen',
        moreCount: 286,
        productImages: [
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'chips' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'potato chips' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'snack' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'packaged food' }
        ]
    },
    {
        id: 'oil-ghee',
        name: 'Oil, Ghee & Masala',
        moreCount: 184,
        productImages: [
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'oil bottle' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'packaged food' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'oil bottle' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'packaged food' }
        ]
    },
    {
        id: 'drinks',
        name: 'Drinks & Juices',
        moreCount: 111,
        productImages: [
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'coke bottle' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'soda bottle' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'coke can' },
            { url: 'https://placehold.co/100x100.png', dataAiHint: 'juice bottle' }
        ]
    }
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
