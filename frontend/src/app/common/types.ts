export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export interface MessageWrapper {
  message: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export interface User extends Omit<RegisterPayload, 'password'> {
  userId: number;
  role: Role;
  token: string;
}

export interface UserData {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export type CreateProductPayload = Omit<Product, 'productId'>;

export interface EditProductPayload {
  name: string;
  description: string;
  price: number;
}

export interface Review {
  reviewId: number;
  rating: number;
  content: string;
  timestamp: number;
  user: User;
  product: Product;
}

export interface CreateReviewPayload
  extends Omit<Review, 'reviewId' | 'user' | 'product'> {
  username: string;
  productId: number;
}

export interface Order {
  orderId: number;
  user: User;
  timestamp: number;
  orderedProducts: Product[];
  price: number;
}

export interface CreateOrderPayload {
  timestamp: number;
}

export interface AddToCartResponse {
  message: string;
  cart: Product[];
}

export interface AddToFavoritesResponse {
  message: string;
  favorites: Product[];
}

export interface LinkedProducts {
  favorites: Product[];
  cart: Product[];
}
