export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  wholesalePrice: number;
  image: string;
  description: string;
  inStock: boolean;
  minOrder: number;
  unit: string;
  nutritionInfo?: string;
  origin?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  companyName?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: string;
}

export interface AISettings {
  openaiApiKey: string;
  seoEnabled: boolean;
  recommendationsEnabled: boolean;
}