import { Order } from './order';

export interface Payment {
  idPayment?: number;
  amount: number;
  paymentMethod: string;
  status: string;
  paidAt: string;
  order: Order;
}
