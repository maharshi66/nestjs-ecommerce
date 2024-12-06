import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../constants/order-status';
export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  orderId: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  @IsOptional()
  trackingNumber: string;

  @IsString()
  @IsOptional()
  trackingCompany: string;
}