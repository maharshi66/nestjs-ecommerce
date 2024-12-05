import { Body, Headers, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_PATTERNS } from 'apps/libs/common/constants/patterns';
import { ORDER_MANAGEMENT_SERVICE } from 'apps/libs/common/constants/services';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';
@Injectable()
export class OrderManagementService {
  constructor(@Inject(ORDER_MANAGEMENT_SERVICE) private orderManagementClient: ClientProxy) {}

  createOrder(@Body() createOrder: CreateOrderDto,@Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; //Mock decoded token for now, in production this will be decoded from the JWT token

    const messagePayload = {
      customerId: decodedToken.customerId, // Attach customer ID to payload
      ...createOrder,
    };
    this.orderManagementClient.emit({ cmd: EVENT_PATTERNS.CREATE_ORDER }, messagePayload);
    return { message: 'Order created successfully' };
  }
}
