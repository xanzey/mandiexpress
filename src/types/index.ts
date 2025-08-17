
export type Product = {
  id: string;
  name: string;
  price: number; // Price per kg
  image: string;
  availability: 'In Stock' | 'Out of Stock';
  dataAiHint?: string;
};

export type CartItem = {
  product: Product;
  quantity: number; // Quantity in kg
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  deliverySlot: 'Morning (7-9 AM)' | 'Evening (5-8 PM)';
  date: string;
};

export type Category = {
    id: string;
    name: string;
    moreCount: number;
    productImages: { url: string; dataAiHint: string }[];
}

export interface Address {
    name: string;
    phone: string;
    houseNo: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
}
