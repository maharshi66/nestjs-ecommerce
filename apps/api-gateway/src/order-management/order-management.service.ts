import { Body, Headers, Inject, Injectable, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_PATTERNS, MESSAGE_PATTERNS } from 'apps/libs/common/constants/patterns';
import { ORDER_MANAGEMENT_SERVICE } from 'apps/libs/common/constants/services';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';
import { UpdateOrderDto } from 'apps/libs/common/dto/update-order.dto';
@Injectable()
export class OrderManagementService {
  constructor(@Inject(ORDER_MANAGEMENT_SERVICE) private orderManagementClient: ClientProxy) {}

  getAllOrders(@Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; //Mock decoded token for now, in production this will be decoded from the JWT token

    const messagePayload = {
      customerId: decodedToken.customerId,
    };
    return this.orderManagementClient.send({ cmd: 'order.get.all' }, messagePayload);
  }

  getOrderById(@Param('id') orderId: string, @Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; //Mock decoded token for now, in production this will be decoded from the JWT token

    const messagePayload = {
      customerId: decodedToken.customerId,
      orderId,
    };
    return this.orderManagementClient.send({ cmd: MESSAGE_PATTERNS.GET_ORDER_BY_ID }, messagePayload);
  }

  createOrder(@Body() createOrder: CreateOrderDto,@Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; //Mock decoded token for now, in production this will be decoded from the JWT token

    const messagePayload = {
      customerId: decodedToken.customerId,
      ...createOrder,
    };
    this.orderManagementClient.emit({ cmd: EVENT_PATTERNS.CREATE_ORDER }, messagePayload);
    return { message: 'Order created successfully' };
  }

  updateOrder(@Param('id') orderId: string, @Body() updateOrder: UpdateOrderDto, @Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; // Mock decoded token for now, in production this will be decoded from the JWT token

    const messagePayload = {
      customerId: decodedToken.customerId,
      orderId,
      ...updateOrder,
    };

    this.orderManagementClient.emit({ cmd: EVENT_PATTERNS.UPDATE_ORDER }, messagePayload);
    return { message: 'Order updated successfully' };
  }

  deleteOrder(@Param('id') orderId: string, @Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; // Mock decoded token for now, in production this will be decoded from the JWT token

    const messagePayload = {
      customerId: decodedToken.customerId,
      orderId,
    };

    this.orderManagementClient.emit({ cmd: EVENT_PATTERNS.DELETE_ORDER }, messagePayload);
    return { message: 'Order deleted successfully' };
  }
}