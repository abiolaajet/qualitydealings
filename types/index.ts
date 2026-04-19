export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  parent?: string | Category;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  brand: string;
  category: string | Category;
  categories: (string | Category)[];
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
  specifications: Record<string, string>;
  isFeatured: boolean;
  condition: 'new' | 'used';
  vendor?: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}
