import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OrderManagementService } from './order-management.service';
import { EVENT_PATTERNS, MESSAGE_PATTERNS } from 'libs/common/constants/patterns';
import { CreateOrderDto } from 'libs/common/dto/create-order.dto';
import { UpdateOrderDto } from 'libs/common/dto/update-order.dto';
import { OrderIdDto } from 'libs/common/dto/order-id.dto';

@Controller()
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @MessagePattern({ cmd: MESSAGE_PATTERNS.GET_ALL_ORDERS })
  handleGetAllOrders(customerId: string) {
    console.log('Fetch all orders request received');
    return this.orderManagementService.handleGetAllOrders(customerId);
  }

  @MessagePattern({ cmd: MESSAGE_PATTERNS.GET_ORDER_BY_ID })
  handleGetOrderById(orderId: string) {
    console.log('Fetch order by ID request received');
    return this.orderManagementService.handleGetOrderById(orderId);
  }

  @EventPattern({ cmd: EVENT_PATTERNS.CREATE_ORDER })
  handleCreateOrder(order: CreateOrderDto) {
    console.log('Order placed request received');
    return this.orderManagementService.handleCreateOrder(order);
  }

  @MessagePattern({ cmd: MESSAGE_PATTERNS.UPDATE_ORDER })
  handleUpdateOrder(order: UpdateOrderDto) {
    console.log('Order update request received');
    return this.orderManagementService.handleOrderUpdate(order);
  }

  @MessagePattern({ cmd: MESSAGE_PATTERNS.DELETE_ORDER })
  handleDeleteOrder(orderId: string) {
    console.log('Order delete request received');
    return this.orderManagementService.handleDeleteOrder(orderId);
  }
}
