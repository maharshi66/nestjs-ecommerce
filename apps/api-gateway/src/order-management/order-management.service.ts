import { Body, Headers, Inject, Injectable, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_PATTERNS, MESSAGE_PATTERNS } from 'libs/common/constants/patterns';
import { ORDER_MANAGEMENT_SERVICE } from 'libs/common/constants/services';
import { CreateOrderDto } from 'libs/common/dto/create-order.dto';
import { OrderIdDto } from 'libs/common/dto/order-id.dto';
import { UpdateOrderDto } from 'libs/common/dto/update-order.dto';
@Injectable()
export class OrderManagementService {
  constructor(@Inject(ORDER_MANAGEMENT_SERVICE) private orderManagementClient: ClientProxy) {}

  getAllOrders(@Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; //Mock decoded token for now, in production this will be decoded from the JWT token
    return this.orderManagementClient.send({ cmd: MESSAGE_PATTERNS.GET_ALL_ORDERS }, decodedToken.customerId);
  }

  getOrderById(@Param('id') orderId: string, @Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; //Mock decoded token for now, in production this will be decoded from the JWT token
    return this.orderManagementClient.send({ cmd: MESSAGE_PATTERNS.GET_ORDER_BY_ID }, orderId);
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
      orderId,
      ...updateOrder,
    };

    return this.orderManagementClient.send({ cmd: MESSAGE_PATTERNS.UPDATE_ORDER }, messagePayload);
  }

  deleteOrder(@Param('id') orderId: string, @Headers() authToken: string) {
    const decodedToken = { customerId: 'CUST01' }; // Mock decoded token for now, in production this will be decoded from the JWT token
    return this.orderManagementClient.send({ cmd: MESSAGE_PATTERNS.DELETE_ORDER }, orderId);
  }
}