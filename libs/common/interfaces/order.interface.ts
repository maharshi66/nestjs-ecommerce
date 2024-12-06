import { OrderStatus } from "libs/common/constants/order-status";

export interface Order {
  customer_id: string;
  shipping_address: string;
  status: OrderStatus;
  total_amount: number;
}

export interface OrderLineItem {
  id?: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at?: Date;
  updated_at?: Date;
}
