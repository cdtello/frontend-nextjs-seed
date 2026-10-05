/**
 * Tipos compartidos con el backend NestJS
 * Espejo de las entities y DTOs del backend para tipar el frontend.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  isActive: boolean;
}

export interface CreateUserDto {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  user: User;
  items: OrderItem[];
  total: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  createdAt: string;
}

export interface CreateOrderDto {
  userId: string;
  items: { productId: string; quantity: number }[];
}
