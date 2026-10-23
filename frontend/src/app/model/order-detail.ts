import { Order } from './order';
import { Product } from './product';

export interface OrderDetail {
  idOrderDetail?: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  order: Order;
  product: Product;
}
