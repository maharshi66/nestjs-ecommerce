import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrderManagementService } from './order-management.service';
import { EVENT_PATTERNS } from 'apps/libs/common/constants/patterns';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';
import { UpdateOrderDto } from 'apps/libs/common/dto/update-order.dto';

@Controller()
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @EventPattern({ cmd: EVENT_PATTERNS.CREATE_ORDER })
  handleCreateOrder(order: CreateOrderDto) {
    console.log('Order placed request received');
    return this.orderManagementService.handleCreateOrder(order);
  }

  @EventPattern({ cmd: EVENT_PATTERNS.UPDATE_ORDER })
  handleUpdateOrder(order: UpdateOrderDto) {
    console.log('Order update request received');
    return this.orderManagementService.handleOrderUpdate(order);
  }

  @EventPattern({ cmd: EVENT_PATTERNS.DELETE_ORDER })
  handleDeleteOrder(orderId: string) {
    console.log('Order delete request received');
    return this.orderManagementService.handleDeleteOrder(orderId);
  }
}
