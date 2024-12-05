import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'apps/order-management/src/dto/create-order.dto';

@Injectable()
export class OrderManagementService {
  constructor(@Inject("ORDER_MANAGEMENT_SERVICE") private rabbitMqClient: ClientProxy) {}
  createOrder(createOrder: CreateOrderDto) {
    this.rabbitMqClient.emit({ cmd: 'order.create' }, createOrder);
    return { message: 'Order created successfully' };
  }
}
