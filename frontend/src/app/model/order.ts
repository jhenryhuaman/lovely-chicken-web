import { DiningTable } from './dining-table';

export interface Order {
  idOrder?: number;
  createdAt: string;
  orderType: string;
  status: string;
  total: number;
  diningTable?: DiningTable | null;
}
