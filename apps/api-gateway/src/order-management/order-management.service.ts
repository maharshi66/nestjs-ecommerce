import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_PATTERNS } from 'apps/libs/common/constants/patterns';
import { ORDER_MANAGEMENT_SERVICE } from 'apps/libs/common/constants/services';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';
@Injectable()
export class OrderManagementService {
  constructor(@Inject(ORDER_MANAGEMENT_SERVICE) private rabbitMqClient: ClientProxy) {}
  createOrder(createOrder: CreateOrderDto) {
    this.rabbitMqClient.emit({ cmd: EVENT_PATTERNS.CREATE_ORDER }, createOrder);
    return { message: 'Order created successfully' };
  }
}
