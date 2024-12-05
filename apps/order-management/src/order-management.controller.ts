import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrderManagementService } from './order-management.service';
import { EVENT_PATTERNS } from 'apps/libs/common/constants/patterns';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';

@Controller()
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @EventPattern({ cmd: EVENT_PATTERNS.CREATE_ORDER })
  handleOrderPlaced(order: CreateOrderDto) {
    console.log('Order placed request received');
    return this.orderManagementService.handleOrderPlaced(order);
  }
}
