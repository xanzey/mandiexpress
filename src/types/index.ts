export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  availability: 'In Stock' | 'Out of Stock';
  dataAiHint?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  deliverySlot: 'Morning (7-9 AM)' | 'Evening (5-8 PM)';
  date: string;
};
